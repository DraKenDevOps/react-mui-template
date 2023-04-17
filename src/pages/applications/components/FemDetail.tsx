/* eslint-disable @next/next/no-img-element */
import { forwardRef, ReactElement, Ref, useState, Fragment } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Grid,
} from "@mui/material";
import dayjs from "dayjs";

import { TransitionProps } from "@mui/material/transitions";

import type { TApplicationList } from "../types";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
    detail: TApplicationList;
};

const FemDetail = ({ detail }: Props) => {
    const {
        application_id,
        created_date,
        updated_date,
        dob,
        passport_number,
        first_name,
        last_name,
        age,
        email,
        photo_url,
        passport_url,
    } = detail;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={handleClickOpen}
            >
                {application_id}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                maxWidth="xl"
            >
                <DialogTitle>{first_name + "\u00a0" + last_name}</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item lg={4}>
                            <img src={photo_url} alt="photo" width={"100%"} />
                        </Grid>
                        <Grid item lg={6}>
                            <img
                                src={passport_url}
                                alt="passport"
                                width={"100%"}
                            />
                        </Grid>
                    </Grid>
                    <ul style={{ listStyle: "none" }}>
                        <li>
                            FIRST NAME: <strong>{first_name}</strong>
                        </li>
                        <li>
                            LAST NAME: <strong>{last_name}</strong>
                        </li>
                        <li>
                            AGE: <strong>{age}</strong>
                        </li>
                        <li>
                            EMAIL: <strong>{email}</strong>
                        </li>
                        <li>
                            BIRTH DATE:{" "}
                            <strong>{dayjs(dob).format("DD-MM-YYYY")}</strong>
                        </li>
                        <li>
                            PASSPORT NO: <strong>{passport_number}</strong>
                        </li>
                        <li>
                            CREATED:{" "}
                            <strong>
                                {dayjs(created_date).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                )}
                            </strong>
                        </li>
                        <li>
                            UPDATED:{" "}
                            <strong>
                                {dayjs(updated_date).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                )}
                            </strong>
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FemDetail;
