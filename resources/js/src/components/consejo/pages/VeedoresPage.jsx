import {
    Badge,
    Card,
    Container,
    Grid,
    Group,
    SimpleGrid,
    Text,
} from "@mantine/core";
import React from "react";

export const VeedoresPage = (props) => {

    return (
        <Group position="center" grow>
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
                        <Text weight={500}>{props.nombres}</Text>
                        <Badge size="lg" color="pink" variant="light">
                            {props.dni}
                        </Badge>
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="lg">
                    <Grid grow>
                        <Grid.Col span={6}>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                mt={12}
                                color="dimmed"
                            >
                                Telefono
                            </Text>
                            <Text size="sm" weight={500}>
                                {props.phone}
                            </Text>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                mt={12}
                                color="dimmed"
                            >
                                Cantón
                            </Text>
                            <Text size="sm" weight={500}>
                                {props.nombre_canton}
                            </Text>
                        </Grid.Col>
                    </Grid>

                    <Grid grow>
                        <Grid.Col span={6}>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                mt={12}
                                color="dimmed"
                            >
                                Parroquia
                            </Text>
                            <Text size="sm" weight={500}>
                                {props.nombre_parroquia}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text
                                size="xs"
                                transform="uppercase"
                                weight={700}
                                mt={12}
                                color="dimmed"
                            >
                                Recinto
                            </Text>
                            <Text size="sm" weight={500}>
                                {props.nombre_recinto}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        mt={12}
                        color="dimmed"
                    >
                        Supervisor
                    </Text>
                    <Badge
                        mt={12}
                        size="lg"
                        fullWidth
                        radius="sm"
                        variant="dot"
                    >
                        {props.supervisor ? props.supervisor : ""}
                    </Badge>
                </Card.Section>
            </Card>
        </Group>
    );
};
