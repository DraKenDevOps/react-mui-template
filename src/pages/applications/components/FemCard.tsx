/* eslint-disable @next/next/no-img-element */
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Tooltip,
    Chip,
    CardMedia,
    CardActions,
} from "@mui/material";
import type { TApplicationList } from "../types";
import FemDetail from "./FemDetail";

type Props = {
    female: TApplicationList;
};

const FemCard = ({ female }: Props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 250 }}
                image={female.photo_url}
                title={`${female.first_name}\u00a0${female.last_name}`}
            />
            {/* <CardContent>
                <Typography variant="h5" component="div">
                    {female.application_id}
                </Typography>
            </CardContent> */}
            <CardActions>
                <FemDetail detail={female} />
            </CardActions>
        </Card>
    );
};

export default FemCard;
