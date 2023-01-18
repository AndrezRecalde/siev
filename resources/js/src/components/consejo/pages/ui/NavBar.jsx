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
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    Image,
    Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconChevronDown,
    IconLogout,
    IconChevronRight,
    IconUserCircle,
    IconFileSearch,
    IconUsers,
    IconUserSearch,
    IconChartArcs,
    IconChartArcs3,
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
        icon: IconChartArcs,
        title: "Gráficos por Cantones",
        description: "Porcentaje completado por cada cantón",
        to: "/graficos/cantones",
        target: "",
    },
    {
        icon: IconChartArcs3,
        title: "Gráficos por Parroquias",
        description: "Porcentaje completado por cada parroquia",
        to: "/graficos/parroquias",
        target: "",
    },
];

const searchdata = [
    {
        icon: IconFileSearch,
        title: "Buscar Supervisores",
        description: "Filtrar la búsqueda de Supervisores",
        to: "search/supervisores",
        target: "",
    },
    {
        icon: IconFileSearch,
        title: "Buscar Coordinadores",
        description: "Filtrar la búsqueda de Coordinadores",
        to: "/search/coordinadores",
        target: "",
    },
    {
        icon: IconUsers,
        title: "Exportar Veedores",
        description: "Exportar todos los veedores",
        to: "/api/pdf/veedores",
        target: "_blank",
    },
    {
        icon: IconUserSearch,
        title: "Buscar Veedores",
        description: "Filtrar la búsqueda de Veedores",
        to: "/search/veedores",
        target: "",
    }
];

export const NavBar = () => {
    const { user, startLogout } = useAuthStore();
    const { exportPDF } = useConsejoStore();

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);

    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    const [linksOpenedSearch, { toggle: toggleLinksSearch }] = useDisclosure(false);


    const { classes, theme, cx } = useStyles();

    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const handleExportPdf = (e) => {
        e.preventDefault();
        exportPDF();
    };

    const graphicLinks = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <Link
                    to={item.to}
                    target={item.target}
                    className={classes.link}
                >
                    <SimpleGrid cols={1}>
                        <Text size="sm" weight={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </SimpleGrid>
                </Link>
            </Group>
        </UnstyledButton>
    ));

    const search = searchdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <Link
                    to={item.to}
                    target={item.target}
                    className={classes.link}
                >
                    <SimpleGrid cols={1}>
                        <Text size="sm" weight={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </SimpleGrid>
                </Link>
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
                        <Link to="/home" className={classes.link}>
                            Inicio
                        </Link>
                        {user.roles.includes("Administrador") ? (
                            <>
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

                                    <HoverCard.Dropdown
                                        sx={{ overflow: "hidden" }}
                                    >
                                        <SimpleGrid cols={2} spacing={0}>
                                            {graphicLinks}
                                        </SimpleGrid>
                                    </HoverCard.Dropdown>
                                </HoverCard>
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
                                                    Buscador
                                                </Box>
                                                <IconChevronDown
                                                    size={16}
                                                    color={theme.fn.primaryColor()}
                                                />
                                            </Center>
                                        </a>
                                    </HoverCard.Target>

                                    <HoverCard.Dropdown
                                        sx={{ overflow: "hidden" }}
                                    >
                                        <SimpleGrid cols={2} spacing={0}>
                                            {search}
                                        </SimpleGrid>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/search/veedores"
                                    className={classes.link}
                                >
                                    Buscar Veedores
                                </Link>
                                <Link
                                    to="/search/coordinadores"
                                    className={classes.link}
                                >
                                    Buscar Coordinadores
                                </Link>
                            </>
                        )}
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
                        Inicio
                    </Link>
                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Gráficos
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>

                    {user.roles.includes("Administrador") ? (
                        <Collapse in={linksOpened}>{graphicLinks}</Collapse>
                    ) : (
                        <>
                            <Link
                                to="/search/veedores"
                                className={classes.link}
                            >
                                Buscador Veedores
                            </Link>
                            <Link
                                to="/search/coordinadores"
                                className={classes.link}
                            >
                                Buscador Coordinadores
                            </Link>
                        </>
                    )}

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinksSearch}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Buscador
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>

                    {user.roles.includes("Administrador") ? (
                        <Collapse in={linksOpenedSearch}>{search}</Collapse>
                    ): (
                        <>
                        </>
                    )}

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
