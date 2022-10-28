import {
    Badge,
    Card,
    Divider,
    Grid,
    Group,
    Progress,
    Text,
} from "@mantine/core";
import { IconBadge } from "@tabler/icons";
import React from "react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../hooks/useConsejoStore";

export const ProfilePage = () => {
    const { profile, veedores } = useAuthStore();
    const { juntas } = useConsejoStore();

    const porcentajeJuntas = () => {
        let total;
        total = (veedores.length * 100) / juntas;
        return [
            {
                value: total.toFixed(2),
                tooltip: total.toFixed(2) + "%",
            },
        ];
    };

    return (
        <Group position="center">
            <Card
                withBorder
                shadow="sm"
                radius="md"
                mt="lg"
                mb="lg"
                sx={{ position: "static", width: 400 }}
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
                            Bienvenido
                        </Text>
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="lg">
                    <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                    >
                        Cédula
                    </Text>
                    <Text size="lg" weight={500}>
                        {profile.dni}
                    </Text>
                    <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                        mt={12}
                    >
                        Nombres
                    </Text>
                    <Text size="lg" weight={500}>
                        {profile.first_name + " " + profile.last_name}
                    </Text>
                    <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                        mt={12}
                    >
                        Role
                    </Text>
                    <Badge
                        sx={{ paddingLeft: 3 }}
                        size="lg"
                        radius="xl"
                        color="teal"
                        leftSection={<IconBadge size={12} />}
                    >
                        {profile.roles?.map((role) => role)}
                    </Badge>
                    <Divider my="sm" variant="dashed" />
                    <Grid grow>
                        <Grid.Col span={6}>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                color="dimmed"
                                mt={12}
                            >
                                Cantón
                            </Text>
                            <Text size="lg" weight={500}>
                                {profile.canton}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                color="dimmed"
                                mt={12}
                            >
                                Parroquia
                            </Text>
                            <Text size="lg" weight={500}>
                                {profile.parroquias?.map((parr) => parr )}
                            </Text>
                        </Grid.Col>
                    </Grid>

                    <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                        mt={12}
                    >
                        Recinto
                    </Text>

                    {profile.recintos?.map((rec) => {
                        return(
                        <Text key={rec[0]} size="lg" weight={500}>

                            <li key={rec[0]}>{rec[1] +" -   " + rec[2]}</li>
                        </Text>)
                    })}

                    <Divider my="sm" variant="dashed" />
                    {profile.roles?.includes("Coordinador") ? (
                        <>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                color="dimmed"
                                mt={12}
                            >
                                Supervisor
                            </Text>
                            <Text size="lg" weight={500}>
                                {profile.responsable}
                            </Text>
                            <Divider my="sm" variant="dashed" />
                        </>
                    ) : (
                        ""
                    )}
                    <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                        mt={12}
                    >
                        Progreso
                    </Text>
                    <Progress
                        animate
                        color="yellow"
                        sections={porcentajeJuntas()}
                        size="xl"
                        radius="xl"
                    />
                </Card.Section>
            </Card>
        </Group>
    );
};
