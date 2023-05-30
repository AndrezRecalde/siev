import { Button, Divider, Grid, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    Icon123,
    IconAt,
    IconBrandTelegram,
    IconPhonePlus,
} from "@tabler/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../../hooks/useConsejoStore";
import { useStatesStore } from "../../../../hooks/useStatesStore";
import { useUiStore } from "../../../../hooks/useUiStore";

export const ModalCreateVeedGrant = () => {
    const { isOpenModalCreateVeedorGrant, modalActionVeedorGrant } =
        useUiStore();
    const { activateVeedor, setClearActivateVeedor, startSavingVeedorGrant } =
        useConsejoStore();

    const {
        allParroquias,
        recintos,
        allRecintos,
        startLoadRecintos,
        startClearStates,
    } = useStatesStore();

    const { startProfile, coordinadores, getVeedoresxRecinto } = useAuthStore();

    const { recinto_id } = useParams();

    const form = useForm({
        initialValues: {
            first_name: "",
            last_name: "",
            dni: "",
            phone: "",
            user_id: 0,
            email: "",
            observacion: "",
            parroquia_id: 0,
            recinto_id: 0,
            recinto__id: 0,
        },
        validate: {
            first_name: (value) =>
                value.length < 3 ? "El nombre es requerido" : null,
            last_name: (value) =>
                value.length < 3 ? "El apellido es requerido" : null,
            dni: (value) =>
                value.length < 9
                    ? "Ingrese la cédula correctamente (deben ser 10 dígitos)"
                    : value.length > 10
                    ? "Ingrese el número correctamente (deben ser 10 dígitos)"
                    : null,
            phone: (value) =>
                value.length < 10
                    ? "Ingrese el número correctamente (deben ser 10 dígitos)"
                    : value.length > 10
                    ? "Ingrese el número correctamente (deben ser 10 dígitos)"
                    : null,
            user_id: (value) => (value === 0 ? "Ingrese el coordinador" : null),
            parroquia_id: (value) =>
                value === 0 ? "Ingrese la parroquia" : null,
            recinto_id: (value) =>
                value === 0 ? "Ingrese el recinto donde vota" : null,
            recinto__id: (value) =>
                value === 0 ? "Ingrese el recinto donde cuida voto" : null,
        },
    });

    const { parroquia_id } = form.values;

    useEffect(() => {
        form.setFieldValue("recinto_id", activateVeedor?.recinto_id ?? 0);
        startLoadRecintos({ parroquia_id });
    }, [parroquia_id]);

    useEffect(() => {
        if (activateVeedor !== null) {
            form.setValues({
                ...activateVeedor,
            });
            return;
        }

        form.reset();
    }, [activateVeedor]);

    const handleCreateVeed = async (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("first_name") &&
            !errors.hasOwnProperty("last_name") &&
            !errors.hasOwnProperty("dni") &&
            !errors.hasOwnProperty("phone") &&
            !errors.hasOwnProperty("user_id") &&
            !errors.hasOwnProperty("email") &&
            !errors.hasOwnProperty("parroquia_id") &&
            !errors.hasOwnProperty("recinto_id") &&
            !errors.hasOwnProperty("recinto__id")
        ) {
            await startSavingVeedorGrant(form.values);
            modalActionVeedorGrant("close");
            await startProfile();
            await getVeedoresxRecinto(recinto_id);
            form.reset();
        } else {
            console.log("Error");
        }
    };

    const handleCloseModal = () => {
        modalActionVeedorGrant("close");
        startClearStates();
        setClearActivateVeedor();
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalCreateVeedorGrant}
            onClose={handleCloseModal}
            title="Crear Veedor"
        >
            <form onSubmit={handleCreateVeed}>
                <Grid grow>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Nombres"
                            label="Nombres"
                            withAsterisk
                            {...form.getInputProps("first_name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Apellidos"
                            label="Apellidos"
                            withAsterisk
                            {...form.getInputProps("last_name")}
                        />
                    </Grid.Col>
                </Grid>
                <Grid grow>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Cédula"
                            label="Cédula"
                            icon={<Icon123 size={14} />}
                            mt={16}
                            withAsterisk
                            {...form.getInputProps("dni")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Teléfono"
                            label="Teléfono"
                            icon={<IconPhonePlus size={14} />}
                            mt={16}
                            withAsterisk
                            {...form.getInputProps("phone")}
                        />
                    </Grid.Col>
                </Grid>

                <Select
                    label="Coordinador"
                    placeholder="Ingrese el Coordinador"
                    searchable
                    withAsterisk
                    mt={16}
                    {...form.getInputProps("user_id")}
                    data={coordinadores.map((coordinador) => {
                        return {
                            value: coordinador.id,
                            label:
                                coordinador.first_name +
                                " " +
                                coordinador.last_name,
                        };
                    })}
                />

                <Textarea
                    placeholder="Ingrese observación o detalles especificos del veedor"
                    label="Detalles Especificos"
                    mt={16}
                    {...form.getInputProps("observacion")}

                />

                <TextInput
                    placeholder="Email (Opcional)"
                    label="Email"
                    mt={16}
                    icon={<IconAt size={14} />}
                    {...form.getInputProps("email")}
                />
                <Select
                    label="Parroquia de residencia del Veedor"
                    placeholder="Parroquia de residencia del veedor"
                    searchable
                    withAsterisk
                    defaultValue="0"
                    mt={16}
                    {...form.getInputProps("parroquia_id")}
                    data={allParroquias.map((parroquia) => {
                        return {
                            value: parroquia.id,
                            label: parroquia.nombre_parroquia,
                        };
                    })}
                />
                <Select
                    label="Recinto donde vota"
                    placeholder="Recinto donde vota"
                    searchable
                    withAsterisk
                    defaultValue="0"
                    mt={16}
                    {...form.getInputProps("recinto_id")}
                    data={recintos.map((recinto) => {
                        return {
                            value: recinto.id,
                            label: recinto.nombre_recinto,
                        };
                    })}
                />
                <Select
                    label="Recinto donde cuidará el voto"
                    placeholder="Recinto donde cuidará el voto"
                    searchable
                    withAsterisk
                    defaultValue="0"
                    mt={16}
                    {...form.getInputProps("recinto__id")}
                    data={allRecintos.map((recinto) => {
                        return {
                            value: recinto.id,
                            label: recinto.nombre_recinto,
                        };
                    })}
                />
                <Divider my="sm" variant="dashed" />
                <Button
                    onClick={handleCreateVeed}
                    fullWidth
                    leftIcon={<IconBrandTelegram />}
                    color="yellow"
                >
                    Crear
                </Button>
            </form>
        </Modal>
    );
};
