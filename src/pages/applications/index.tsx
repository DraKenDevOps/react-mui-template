import { useState, useEffect, ChangeEvent, Fragment } from "react";
import { Grid, Divider, Box, Pagination, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
    useGetFemaleApplicationQuery,
    useGetFemaleApplicationOptionMutation,
    useGetFemaleDateRangeMutation,
} from "../../stores/services/applications";
import type { TApplicationList } from "./types";
import FemCard from "./components/FemCard";

const index = () => {
    const [page, setPage] = useState<number | any>(1);
    const [paginateCount, setPaginateCount] = useState<number>(0);

    const [dob_start, setDobStart] = useState<Dayjs>(dayjs("1995-01-01"));
    const [dob_end, setDobEnd] = useState<Dayjs>(dayjs("2002-12-31"));

    const [females, setFemales] = useState<TApplicationList[]>([]);

    const { data: default_data } = useGetFemaleApplicationQuery(page);

    const [getFemaleApplicationOption] =
        useGetFemaleApplicationOptionMutation();

    const [getListByDOB] = useGetFemaleDateRangeMutation();

    const handleChangePage = async (e: ChangeEvent<unknown>, page: number) => {
        setPage(page);
        // @ts-ignore
        const { data: pagi_data } = await getFemaleApplicationOption(page);
        setFemales(pagi_data.female_list);
    };

    const filterApplication = async () => {
        // @ts-ignore
        const { data: bydob } = await getListByDOB({
            page,
            dob_start,
            dob_end,
        });
        setFemales(bydob.female_list);
        setPaginateCount(bydob.record);
    };

    useEffect(() => {
        if (default_data) {
            setFemales(default_data.female_list);
            setPaginateCount(default_data.record);
        }
    }, [default_data]);

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container mb={2}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <DesktopDatePicker
                            label="DOB START"
                            value={dob_start}
                            onChange={(date: Date | any) => setDobStart(date)}
                            // renderInput={(param: any) => (
                            //     <TextField
                            //         {...param}
                            //         size="medium"
                            //         sx={{ width: "100%" }}
                            //     />
                            // )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <DesktopDatePicker
                            label="DOB END"
                            value={dob_end}
                            onChange={(date: Date | any) => setDobEnd(date)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Button
                            variant="outlined"
                            startIcon={<Search />}
                            onClick={filterApplication}
                        >
                            search
                        </Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
                {females.map((data: TApplicationList, i: number) => (
                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3} key={i}>
                        <FemCard female={data} />
                    </Grid>
                ))}
            </Grid>
            {females?.length || paginateCount >= 8 ? (
                <Box
                    justifyContent="end"
                    alignItems="center"
                    display="flex"
                    sx={{ marginTop: 2 }}
                >
                    <Pagination
                        count={Math.ceil(paginateCount / 8)}
                        shape="rounded"
                        color="primary"
                        page={page}
                        siblingCount={0}
                        onChange={handleChangePage}
                        showFirstButton
                        showLastButton
                    />
                </Box>
            ) : (
                <></>
            )}
        </Fragment>
    );
};

export default index;
