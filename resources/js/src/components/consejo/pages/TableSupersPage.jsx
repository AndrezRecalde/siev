import {
    ActionIcon,
    Button,
    Card,
    Grid,
    Group,
    RingProgress,
    ScrollArea,
    Table,
    Text,
} from "@mantine/core";
import { IconEdit, IconPencilPlus, IconTrash } from "@tabler/icons";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../hooks/useConsejoStore";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { useUiStore } from "../../../hooks/useUiStore";
import { ModalCreateSuper } from "./ui/ModalCreateSuper";

export const TableSupersPage = () => {
    const { modalActionSuper } = useUiStore();
    const { supervisores } = useAuthStore();
    const { startLoadCantones, startLoadRoles } = useStatesStore();
    const { setActiveUser, setClearActivateUser, startDeleteUser } =
        useConsejoStore();

    const handleCreateSuper = async (e) => {
        e.preventDefault();
        await startLoadCantones();
        await startLoadRoles();
        setClearActivateUser();
        modalActionSuper("open");
    };

    const handleSelect = async (user) => {
        setActiveUser(user);
        await startLoadCantones();
        await startLoadRoles();
        modalActionSuper("open");
    };

    const handleSelectDelete = async (user) => {
        startDeleteUser(user);
    };

    const rows = supervisores.map((element) => (
        <tr key={element.dni}>
            <td>{element.first_name + " " + element.last_name}</td>
            <td>{element.phone}</td>
            <td>{element.canton?.nombre_canton}</td>
            <td>{element.parroquias?.map((parr) => parr.nombre_parroquia)}</td>
            <td>
                {(
                <RingProgress
                    size={90}
                    sections={[{ value: 20, color: "cyan" }]}
                    label={
                        <Text color="blue" weight={30} align="center" size="xs">
                            {20}
                        </Text>
                    }
                />
                )}
            </td>
            <td>
                <Grid>
                    <Grid.Col span={3}>
                        <ActionIcon
                            color="cyan"
                            variant="light"
                            sx={{ marginRight: 5 }}
                            onClick={() => handleSelect(element)}
                        >
                            <IconEdit size={20} />
                        </ActionIcon>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <ActionIcon
                            onClick={() => handleSelectDelete(element)}
                            color="red"
                            variant="light"
                        >
                            <IconTrash size={20} />
                        </ActionIcon>
                    </Grid.Col>
                </Grid>
            </td>
        </tr>
    ));

    return (
        <>
            <Group position="center">
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                    mt="lg"
                    mb="lg"
                    sx={{ position: "static", width: 800 }}
                >
                    <Card.Section withBorder inheritPadding py="lg">
                        <Group position="apart">
                            <Text
                                component="span"
                                weight={600}
                                style={{
                                    fontFamily: "Greycliff CF, sans-serif",
                                    fontSize: 20,
                                }}
                            >
                                Supervisores
                            </Text>
                        </Group>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Button
                            onClick={handleCreateSuper}
                            leftIcon={<IconPencilPlus />}
                            variant="white"
                        >
                            Crear Supervisor
                        </Button>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <Table>
                                <thead>
                                    <tr>
                                        <th>Nombres</th>
                                        <th>Telefono</th>
                                        <th>Canton</th>
                                        <th>Parroquia</th>
                                        <th>Progreso</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Group>
            <ModalCreateSuper />
        </>
    );
};
