import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    Image,
    Menu,
    Badge,
    Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCode,
    IconChevronDown,
    IconLogout,
    IconUser,
    IconChartDonut,
    IconChevronRight,
    IconUserCircle,
    IconFileSearch,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../../assets/logos/logo.png";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../../hooks/useConsejoStore";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: 42,
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1]
        }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: "Exportar Veedores",
        description: "Exportar todos los veedores",
        to: "/api/pdf/veedores",
        target: "_blank",
    },
    {
        icon: IconChartDonut,
        title: "Gráficos por Cantones",
        description: "Muestra el porcentaje completado por cada cantón",
        to: "/graficos/cantones",
        target: "",
    },
    {
        icon: IconChartDonut,
        title: "Gráficos por Parroquias",
        description: "Muestra el porcentaje completado por cada parroquia",
        to: "/graficos/parroquias",
        target: "",
    },

    {
        icon: IconFileSearch,
        title: "Buscar Veedores",
        description: "Filtrar la búsqueda de Veedores",
        to: "/search/veedores",
        target: "",
    },

    {
        icon: IconFileSearch,
        title: "Buscar Coordinadores",
        description: "Filtrar la búsqueda de Coordinadores",
        to: "/search/coordinadores",
        target: "",
    },
];

export const NavBar = () => {
    const { user, startLogout } = useAuthStore();
    const { exportPDF } = useConsejoStore();

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);

    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    const { classes, theme, cx } = useStyles();

    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const handleExportPdf = (e) => {
        e.preventDefault();
        exportPDF();
    };

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Link
                        to={item.to}
                        target={item.target}
                        className={classes.link}
                    >
                        <Text size="sm" weight={500}>
                            {item.title}
                        </Text>
                    </Link>

                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={50}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Image width={50} height={50} fit="contain" src={logo} />

                    <Group
                        sx={{ height: "100%" }}
                        spacing={0}
                        className={classes.hiddenMobile}
                    >
                        <Link to="/" className={classes.link}>
                            Inicio
                        </Link>
                        <HoverCard
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Gráficos
                                        </Box>
                                        <IconChevronDown
                                            size={16}
                                            color={theme.fn.primaryColor()}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Menu
                            width={260}
                            position="bottom-end"
                            transition="pop-top-right"
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, {
                                        [classes.userActive]: userMenuOpened,
                                    })}
                                >
                                    <Group>
                                        <IconUserCircle
                                            size={25}
                                            stroke={1.5}
                                        />

                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" weight={500}>
                                                {user.first_name +
                                                    " " +
                                                    user.last_name}
                                            </Text>

                                            <Text color="dimmed" size="xs">
                                                {user.roles[0]
                                                    ? user.roles[0]
                                                    : ""}
                                            </Text>
                                        </div>
                                        <IconChevronRight
                                            size={14}
                                            stroke={1.5}
                                        />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    color="red"
                                    icon={<IconLogout size={18} stroke={2.5} />}
                                    onClick={startLogout}
                                >
                                    Salir
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={classes.hiddenDesktop}
                    />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Menu"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.1"
                        }
                    />

                    <Link to="/" className={classes.link}>
                        Home
                    </Link>
                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Exportar
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <Link to="/search/veedores" className={classes.link}>
                        Buscador Veedores
                    </Link>
                    <Link to="/search/coordinadores" className={classes.link}>
                        Buscador Coordinadores
                    </Link>
                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.1"
                        }
                    />

                    <Group position="center" grow pb="xl" px="md">
                        <Button onClick={startLogout} color="red">
                            Salir
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
};
