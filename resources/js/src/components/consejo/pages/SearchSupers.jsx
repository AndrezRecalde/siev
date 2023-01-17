import {
    Button,
    Card,
    Container,
    Grid,
    Group,
    Paper,
    Select,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconDatabaseExport } from "@tabler/icons";
import React, { useEffect } from "react";
import { useSearch } from "../../../hooks/useSearch";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { GridTableSupersSearch } from "./ui/GridTableSupersSearch";

export const SearchSupers = () => {
    const {
        cantones,
        parroquias,
        startLoadCantones,
        startLoadParroquias,
        startClearStates,
    } = useStatesStore();

    const {
        startSearchSuper,
        startExportFilterSupers,
        startExportExcelSupers,
        startClearResults,
    } = useSearch();

    const form = useForm({
        initialValues: {
            canton_id: 0,
            parroquia_id: 0,
        },
    });

    useEffect(() => {
        startLoadCantones();
        return () => {
            startClearStates();
            startClearResults();
        };
    }, []);

    const { canton_id } = form.values;

    useEffect(() => {
        form.setFieldValue("parroquia_id", 0);
        startLoadParroquias({ canton_id });
    }, [canton_id]);

    const handleSearch = (e) => {
        e.preventDefault();
        startSearchSuper(form.values);
        /* console.log(form.values) */
    };

    const handleExport = (e) => {
        e.preventDefault();
        startExportFilterSupers(form.values);
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        console.log(form.values);
        startExportExcelSupers(form.values);
    };

    return (
        <>
            <Container>
                <Card
                    withBorder
                    shadow="sm"
                    radius="md"
                    mt="md"
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
                                Buscar Supervisores
                            </Text>
                            <Group>
                                <Button
                                    variant="subtle"
                                    color="red"
                                    radius="lg"
                                    onClick={handleExport}
                                    leftIcon={
                                        <IconDatabaseExport
                                            size={15}
                                            color="red"
                                        />
                                    }
                                >
                                    PDF
                                </Button>
                                <Button
                                    variant="subtle"
                                    color="green"
                                    radius="lg"
                                    onClick={handleExportExcel}
                                    leftIcon={
                                        <IconDatabaseExport
                                            size={15}
                                            color="green"
                                        />
                                    }
                                >
                                    Excel
                                </Button>
                            </Group>
                        </Group>
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="lg">
                        <form onSubmit={handleSearch}>
                            <Grid grow>
                                <Grid.Col xs={6} md={6} lg={3}>
                                    <Select
                                        label="Selecciona el Cantón"
                                        placeholder="Cantón"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("canton_id")}
                                        data={cantones.map((canton) => {
                                            return {
                                                value: canton.id,
                                                label: canton.nombre_canton,
                                            };
                                        })}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6} md={6} lg={3}>
                                    <Select
                                        label="Selecciona el Parroquia"
                                        placeholder="Parroquia"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("parroquia_id")}
                                        data={parroquias.map((parroquia) => {
                                            return {
                                                value: parroquia.id,
                                                label: parroquia.nombre_parroquia,
                                            };
                                        })}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Card.Section inheritPadding py="lg">
                                <Button
                                    color="yellow"
                                    variant="light"
                                    radius="md"
                                    uppercase
                                    fullWidth
                                    onClick={handleSearch}
                                    leftIcon={<IconDatabase size={14} />}
                                >
                                    Filtrar
                                </Button>
                            </Card.Section>
                        </form>
                    </Card.Section>
                </Card>
            </Container>
            <Container size={1200}>
                <Paper mb={30}>
                    <GridTableSupersSearch />
                </Paper>
            </Container>
        </>
    );
};
