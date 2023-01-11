import { Container, Skeleton } from "@mantine/core";
import React, { useEffect } from "react";
import { Paper, Tabs } from "@mantine/core";
import { ProfilePage } from "./ProfilePage";
import { TableAdminsPage } from "./TableAdminsPage";
import { TableSupersPage } from "./TableSupersPage";
import { TableCoordsPage } from "./TableCoordsPage";
import { TableVeedsPage } from "./TableVeedsPage";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useStatesStore } from "../../../hooks/useStatesStore";

export const HomePage = () => {
    const { status, loading, user, startProfile } = useAuthStore();
    const {
        startLoadCantones,
        startLoadAllParroquias,
        startLoadAllRecintos,
        startLoadRoles,
    } = useStatesStore();

    useEffect(() => {
        startProfile();
    }, []);

    useEffect(() => {
        startLoadCantones();
        startLoadAllParroquias();
        startLoadAllRecintos();
        startLoadRoles();
    }, [status]);

    return (
        <Container>
            <Paper
                sx={{ height: "auto", width: "auto" }}
                shadow="sm"
                radius="md"
                p="md"
                mb={20}
            >
                <Tabs defaultValue="profile">
                    <Tabs.List grow position="center">
                        {user.roles.includes("Administrador") ? (
                            <>
                                <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                                <Tabs.Tab value="administradores">
                                    Ver Admins
                                </Tabs.Tab>
                                <Tabs.Tab value="supervisores">
                                    Ver Supervisores
                                </Tabs.Tab>
                                <Tabs.Tab value="coordinadores">
                                    Ver Coordinadores
                                </Tabs.Tab>
                                <Tabs.Tab value="veedores">
                                    Ver Veedores
                                </Tabs.Tab>
                            </>
                        ) : user.roles.includes("Supervisor") ? (
                            <>
                                <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                                <Tabs.Tab value="coordinadores">
                                    Ver Coordinadores
                                </Tabs.Tab>
                                <Tabs.Tab value="veedores">
                                    Ver Veedores
                                </Tabs.Tab>
                            </>
                        ) : user.roles.includes("Coordinador") ? (
                            <>
                                <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                                <Tabs.Tab value="veedores">
                                    Ver Veedores
                                </Tabs.Tab>
                            </>
                        ) : null}
                    </Tabs.List>
                    <Skeleton visible={loading}>
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
                    </Skeleton>
                </Tabs>
            </Paper>
        </Container>
    );
};
