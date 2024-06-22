import React from 'react'
import ProfileNavbar from "./ProfileNavbar";
import {Container} from "@mui/material";

export default function Profile() {
    return (
        <div className="profile">
            <Container maxWidth={"lg"}>
                <div>
                    <h1>Управління особистими даними</h1>
                </div>
                <ProfileNavbar active={0}></ProfileNavbar>

                <div>
                    
                </div>
            </Container>
        </div>

    )
}
