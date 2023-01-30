import {
    Badge,
    Card,
    Center,
    Container,
    Grid,
    Group,
    RingProgress,
    Text,
    ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGraphicStore } from "../../../hooks/useGraphicStore";

export const GraphicParroquia = () => {
    const {
        grParroquias,
        startLoadGraphicParroquia,
        startClearGraphicParroquia,
    } = useGraphicStore();

    const { canton_id } = useParams();

    useEffect(() => {
        startLoadGraphicParroquia(canton_id);

        return () => {
            startClearGraphicParroquia();
        };
    }, [canton_id]);

    return (
        <Container>
            <Card
                withBorder
                shadow="sm"
                radius="md"
                mt="lg"
                mb="lg"
                sx={{ position: "static", width: "auto" }}
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
                            Grafico por Parroquias
                        </Text>
                    </Group>
                </Card.Section>
                <Card.Section>
                    <Grid>
                        {grParroquias?.map((gr) => {
                            let totalJuntas = parseInt(gr.total_juntas);
                            let totalxVeedor =
                                gr.total_veed !== null ? gr.total_veed : 0;
                            let totales = (totalxVeedor * 100) / totalJuntas;

                            if ( totales > 100 || totales < 100 ) {  //Borrar el menor
                                totales = 100;
                            }

                            return (
                                <Grid.Col key={gr.parroquia_id} span={4}>
                                    <Text
                                        size="xs"
                                        transform="uppercase"
                                        weight={700}
                                        color="dimmed"
                                        mt={20}
                                        ml={15}
                                    >
                                        {gr.nombre_canton} - {" "}
                                        <NavLink
                                            to={`/graficos/recinto/${gr.parroquia_id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "#868e96",
                                            }}
                                        >
                                            {gr.nombre_parroquia}
                                        </NavLink>
                                    </Text>
                                    <Badge
                                        size="lg"
                                        radius="xl"
                                        color="cyan"
                                        ml={15}
                                    >
                                        {`${
                                            gr.total_veed !== null
                                                ? gr.total_veed
                                                : 0
                                        } / ${gr.total_juntas}`}
                                    </Badge>
                                    {totales !== 100 ? (
                                        <RingProgress
                                            sections={[
                                                {
                                                    value: totales,
                                                    color:
                                                        totales !== 100
                                                            ? "blue"
                                                            : "teal",
                                                    tooltip: totales.toFixed(2),
                                                },
                                            ]}
                                            label={
                                                <Text
                                                    color="blue"
                                                    weight={700}
                                                    align="center"
                                                    size="xl"
                                                >
                                                    <NavLink
                                                        to={`/graficos/recinto/${gr.parroquia_id}`}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "#868e96",
                                                        }}
                                                    >
                                                        {`${totales.toFixed(
                                                            2
                                                        )}%`}
                                                    </NavLink>
                                                </Text>
                                            }
                                        />
                                    ) : (
                                        <RingProgress
                                            sections={[
                                                { value: 100, color: "teal" },
                                            ]}
                                            label={
                                                <Center>
                                                    <ThemeIcon
                                                        color="teal"
                                                        variant="light"
                                                        radius="xl"
                                                        size="xl"
                                                    >
                                                        <IconCheck size={22} />
                                                    </ThemeIcon>
                                                </Center>
                                            }
                                        />
                                    )}
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </Card.Section>
            </Card>
        </Container>
    );
};
