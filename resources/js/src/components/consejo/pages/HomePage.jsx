import { Container } from "@mantine/core";
import React from "react";
import { NavBar } from "./ui/NavBar";
import { Paper, Tabs } from "@mantine/core";
import { ProfilePage } from "./ProfilePage";
import { TableAdminsPage } from "./TableAdminsPage";
import { TableSupersPage } from "./TableSupersPage";
import { TableCoordsPage } from "./TableCoordsPage";
import { TableVeedsPage } from "./TableVeedsPage";


export const HomePage = () => {


    return (
        <Container>
            <NavBar />

            <Paper
                sx={{ height: 'auto', width: 'auto' }}
                shadow="sm"
                radius="md"
                p="md"
                mb={20}
            >

                <Tabs defaultValue="profile">
                    <Tabs.List grow position="center">
                    <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                        <Tabs.Tab value="administradores">Ver Admins</Tabs.Tab>
                        <Tabs.Tab value="supervisores">Ver Supervisores</Tabs.Tab>
                        <Tabs.Tab value="coordinadores">Ver Coordinadores</Tabs.Tab>
                        <Tabs.Tab value="veedores">Ver Veedores</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="profile" pt="xs">
                        <ProfilePage />
                    </Tabs.Panel>
                    <Tabs.Panel value="administradores" pt="xs">
                        <TableAdminsPage />
                    </Tabs.Panel>
                    <Tabs.Panel value="supervisores" pt="xs">
                        <TableSupersPage />
                    </Tabs.Panel>
                    <Tabs.Panel value="coordinadores" pt="xs">
                        <TableCoordsPage />
                    </Tabs.Panel>
                    <Tabs.Panel value="veedores" pt="xs">
                        <TableVeedsPage />
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </Container>
    );
};
