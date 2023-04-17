import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, CircularProgress, TextField, } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../../stores'
import { useLoginMutation } from '../../stores/services/userApi'
import ReactInputMask from 'react-input-mask';
import { storeLogin } from '../../stores/features/auth'

type TUser = {
    username: string,
    password: string
}

const initial = {
    username: "",
    password: "",
}
const Login = () => {
    const { pathname } = useLocation()
    const [verify, setVerify] = useState(false);
    const [user, setUser] = useState<TUser>(initial)

    const handleLoginBy = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((state: RootState) => ({ ...state }));

    const [click, setClick] = useState(false);

    const [Login] = useLoginMutation();

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (e.key === "Enter" && !verify) {
            handleSendLogin(user)
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        handleSendLogin(user)
    };



    const handleSendLogin = async (user: TUser) => {

        setClick(true);
        const { data }: any = await Login(user);
        setClick(false);
        if (data && data.status === "success") {
            setVerify(true)
        }

        if (data.errors) {
            data.errors.map((err: any) => toast.error(err.msg))
        } else {
            toast.error(data.message)
        }
    }

    const handleSetLogin = (payload: any) => {
        console.log('payload ', payload)
        if (payload.token) {
            dispatch(storeLogin({
                name: payload.name,
                role: payload.role,
                email: payload.email,
                user_id: payload.user_id,
                token: payload.token,
            }));
            navigate("/dashboard");
        }
    }
    useEffect(() => {
        if (auth && auth.isLogin && `${auth.user_id}`) {
            navigate("/dashboard");
        }
    }, [auth, navigate]);


    return (
        <>

            <Box
                sx={{
                    width: "100%",
                    height: "88vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Box sx={{
                    bgcolor: "#E7E7E7A1",
                    p: 4,
                    maxWidth: "100%",
                    width: "350px",
                    borderRadius: 6,
                    position: "relative",
                }} component="form" onSubmit={handleSubmit}>
                    <Box>
                        <TextField
                            fullWidth
                            value={user.username}
                            label="Username"
                            name='username'
                            margin='dense'
                            type='search'
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            value={user.password}
                            label="Password"
                            name='password'
                            margin='dense'
                            type='search'
                            onChange={handleChange}
                        />
                    </Box>


                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box />
                        <Button disabled={click} type='submit' variant="contained" sx={{ mt: 1 }} fullWidth size="large">
                            {click ? <CircularProgress /> : 'ເຂົ້າສູ່ລະບົບ'}
                        </Button>

                    </Box>

                </Box>
            </Box >

        </>
    )
}

export default Login