import { Image, Container, Text, Button, Grid, Title, Card, Select, TextInput, Modal, Radio } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import axiosConf from '../axios/axiosConf.ts';

interface Password {
    _id: string;
    website: string;
    username?: string;
    email?: string;
    password: string;
    created_at: string;
    updated_at: string;
    icon: string;
}

export function DashboardPage() {
    const navigate = useNavigate();

    const [initialPasswords, setInitialPasswords] = useState<Password[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isAdding, { open, close }] = useDisclosure(false);
    const [editedPassword, setEditedPassword] = useState<Password>({
        _id: '',
        website: '',
        username: '',
        email: '',
        password: '',
        created_at: '',
        updated_at: '',
        icon: '',
    });
    const [addedPassword, setAddedPassword] = useState<Password>({
        _id: '',
        website: '',
        username: '',
        email: '',
        password: '',
        created_at: '',
        updated_at: '',
        icon: '',
    });
    const [selectedOption, setSelectedOption] = useState('username');
    const [sortBy, setSortBy] = useState<'A-Z' | 'Newest' | 'Oldest'>('A-Z');
    const [selectedPassword, setSelectedPassword] = useState<string | null>(null);
    const [groupedPasswords, setGroupedPasswords] = useState<Map<string, Password[]>>(new Map());

    const groupPasswordsByFirstLetter = () => {
        const groupedPasswords: Map<string, Password[]> = new Map();

        initialPasswords.forEach(password => {
            const firstLetter = password.website[0].toUpperCase();
            if (!groupedPasswords.has(firstLetter)) {
                groupedPasswords.set(firstLetter, []);
            }
            groupedPasswords.get(firstLetter)?.push(password);
        });

        return groupedPasswords;
    };

    const groupPasswordsByDate = (sortBy: 'Newest' | 'Oldest') => {
        const groupedPasswords: Map<string, Password[]> = new Map();
        let sortedGroupedPasswords: Map<string, Password[]> = new Map();

        initialPasswords.forEach(password => {
            const year = new Date(password.created_at).getFullYear().toString();
            if (!groupedPasswords.has(year)) {
                groupedPasswords.set(year, []);
            }
            groupedPasswords.get(year)?.push(password);
        });
        if (sortBy === 'Newest') {
            sortedGroupedPasswords = new Map([...groupedPasswords.entries()].sort((a, b) => parseInt(b[0]) - parseInt(a[0])));
            sortedGroupedPasswords.forEach((passwords, year) => {
                const sortedPasswords = passwords.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                sortedGroupedPasswords.set(year, sortedPasswords);
            });
        }
        if (sortBy === 'Oldest') {
            sortedGroupedPasswords = new Map([...groupedPasswords.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
        }
        return sortedGroupedPasswords;
    };

    useEffect(() => {
        if (!localStorage.getItem('SecurVaultToken')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = "SecurVault | Dashboard";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    useEffect(() => {
        const deselectPassword = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('[data-password-id]') && selectedPassword && !isEditing) {
                setSelectedPassword(null);
            }
        };

        document.addEventListener('click', deselectPassword);

        return () => {
            document.removeEventListener('click', deselectPassword);
        };
    }, [isEditing, selectedPassword]);

    const handleLogout = () => {
        localStorage.removeItem('SecurVaultToken');
        navigate('/login');
    };

    const handleSelectPassword = (passwordId: string) => {
        const selected = initialPasswords.find(password => password._id === passwordId);
        console.log(selected);
        const decryptedPassword = selected?.password; //hash with salt and saltrounds
        setSelectedPassword(passwordId);
    };

    useEffect(() => {
        let sortedGroupedPasswords: Map<string, Password[]> = new Map();
        if (sortBy === 'A-Z') {
            sortedGroupedPasswords = groupPasswordsByFirstLetter();
        } else {
            sortedGroupedPasswords = groupPasswordsByDate(sortBy);
        }

        setGroupedPasswords(sortedGroupedPasswords);
    }, [sortBy, initialPasswords]);

    const handleEdit = () => {
        setIsEditing(true);
        const result: Password = initialPasswords.find(password => password._id === selectedPassword) as Password;
        result ? setEditedPassword(result) : setIsEditing(false);
    };
    const handleSave = () => {
        setIsEditing(false);
        const updatedPasswords = initialPasswords.map(password => {
            if (password._id === editedPassword?._id) {
                return {
                    ...editedPassword
                };
            }
            return password;
        });
        setEditedPassword({
            _id: '',
            website: '',
            username: '',
            email: '',
            password: '',
            created_at: '',
            updated_at: '',
            icon: '',
        });
        setInitialPasswords(updatedPasswords);
    }
    const handleDelete = async () => {
        const result = await axiosConf.delete(`/password/remove/${selectedPassword}`);
        if (result.status >= 200 && result.status < 300) {
            console.log(result.data);
            setInitialPasswords(initialPasswords.filter(password => password._id !== selectedPassword));
            setSelectedPassword(null);
        } else {
            console.log(result.data);
        }

    };

    useEffect(() => {
        setIsEditing(false);
        setEditedPassword({
            _id: '',
            website: '',
            username: '',
            email: '',
            password: '',
            created_at: '',
            updated_at: '',
            icon: '',
        });
    }, [selectedPassword]);

    const handleAdd = async () => {
        if (!addedPassword.website || !addedPassword.password || (!addedPassword.username && !addedPassword.email)) {

            return;
        }
        const result = await axiosConf.post('/password/add', addedPassword);
        if (result.status >= 200 && result.status < 300) {
            console.log(result.data);
            setInitialPasswords([...initialPasswords, result.data.password]);
            setAddedPassword({
                _id: '',
                website: '',
                username: '',
                email: '',
                password: '',
                created_at: '',
                updated_at: '',
                icon: '',
            });
            close();
        } else {
            console.log(result.data);
        }
    };

    useEffect(() => {
        const fetchPasswords = async () => {
            const result = await axiosConf.get('/password');
            if (result.status >= 200 && result.status < 300) {
                setInitialPasswords(result.data);
                console.log(result.data)
            } else {
                console.log(result.data);
            }
        };
        fetchPasswords();
    }, []);


    return (
        <Container size="lg" style={{ textAlign: 'center' }} fluid>
            <Title order={1} component="h1" m={50} c="white" style={{ textAlign: 'center', textShadow: "-1px -1px 0 black, 0 -1px 0 black,1px -1px 0 black,1px 0 0 black,1px 1px 0 black, 0 1px 0 black,-1px 1px 0 black,-1px 0 0 black" }}>Welcome to your Password Manager Dashboard</Title>
            <Grid gutter="lg" mt={50}>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Card shadow="sm">
                        <Title order={3}>Options</Title>
                        <Text>Manage your account here</Text>
                        <Button onClick={() => open()} fullWidth color="blue" mt={15}>Add Password</Button>
                        <Button onClick={handleLogout} fullWidth color="red" mt={15}>Logout</Button>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Card shadow="sm">
                        <Title order={3}>Stored Passwords</Title>
                        <Text>View your stored passwords here</Text>

                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginRight: '10px', marginBottom: '15px', lineHeight: '1.5' }}>Sort by</Text>
                                <Select
                                    radius="md"
                                    size="xs"
                                    data={['A-Z', 'Newest', 'Oldest']}
                                    mb={'15px'}
                                    value={sortBy}
                                    onChange={(value) => setSortBy(value?.toString() as 'A-Z' | 'Newest' | 'Oldest')}
                                    styles={{
                                        input: {
                                            textAlign: 'center',
                                            lineHeight: '1.5',
                                        },
                                        dropdown: {
                                            textAlign: 'center',
                                        },
                                    }}
                                />
                            </div>

                            {Array.from(groupedPasswords).map(([key, passwords]) => (
                                <div key={key}>
                                    <Title order={4} style={{ border: '1px solid white', textAlign: 'start', paddingLeft: '15px' }}>{key}</Title>
                                    {passwords.map(password => (
                                        <div key={password.website} data-password-id={password._id} style={{ display: 'flex', alignItems: 'center', backgroundColor: selectedPassword === password._id ? '#0075F6' : '#1D1D1D', padding: '5px' }} onClick={() => handleSelectPassword(password._id)}>
                                            <Image src={password.icon} alt={password.website} width={64} height={64} ml={5} style={{ marginRight: '10px' }} />
                                            <Text style={{ color: 'white' }} ml={15}>{password.website}</Text>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Card shadow="sm">
                        <Title order={3}>Password Info</Title>
                        {selectedPassword && initialPasswords.length > 0 ? (
                            <div style={{ marginTop: '15px' }}>
                                <TextInput
                                    size="md"
                                    label="Website"
                                    value={isEditing ? editedPassword?.website : (initialPasswords.find(password => password._id === selectedPassword)?.website || 'NO DATA')}
                                    disabled={!isEditing}
                                    onChange={isEditing ? (event) => setEditedPassword({ ...editedPassword, website: event.currentTarget.value }) : undefined}
                                />
                                {initialPasswords.find(password => password._id === selectedPassword)?.username && (
                                    <TextInput
                                        size="md"
                                        label="Username"
                                        value={isEditing ? editedPassword?.username : (initialPasswords.find(password => password._id === selectedPassword)?.username || 'NO DATA')}
                                        disabled={!isEditing}
                                        mt={15}
                                        onChange={isEditing ? (event) => setEditedPassword({ ...editedPassword, username: event.currentTarget.value }) : undefined}
                                    />
                                )}
                                {initialPasswords.find(password => password._id === selectedPassword)?.email && (
                                    <TextInput
                                        size="md"
                                        label="Email"
                                        value={isEditing ? editedPassword?.email : (initialPasswords.find(password => password._id === selectedPassword)?.email || 'NO DATA')}
                                        disabled={!isEditing}
                                        onChange={isEditing ? (event) => setEditedPassword({ ...editedPassword, email: event.currentTarget.value }) : undefined}
                                        mt={15}
                                    />
                                )}
                                <TextInput
                                    size="md"
                                    label="Password"
                                    value={isEditing ? editedPassword?.password : (initialPasswords.find(password => password._id === selectedPassword)?.password || 'NO DATA')}
                                    disabled={!isEditing}
                                    onChange={isEditing ? (event) => setEditedPassword({ ...editedPassword, password: event.currentTarget.value }) : undefined}
                                    mt={15}
                                />

                                <Button color="red" mt={15} onClick={handleDelete}>Delete</Button>
                                {isEditing ? (
                                    <Button color="blue" mt={15} ml={15} onClick={handleSave}>Save</Button>
                                ) : (
                                    <Button color="blue" mt={15} ml={15} onClick={handleEdit}>Edit</Button>
                                )}
                                <Text mt={15} style={{ color: 'white' }}>Created at: {
                                    new Date(initialPasswords.find(password => password._id === selectedPassword)?.created_at ?? '').toDateString() || 'NO DATA'
                                }</Text>
                                <Text style={{ color: 'white' }}>Updated at: {new Date(initialPasswords.find(password => password._id === selectedPassword)?.updated_at ?? '').toDateString() || 'NO DATA'}</Text>
                            </div>
                        ) : (
                            <Text style={{ color: 'white' }}>Select a password to view more information</Text>
                        )}
                    </Card>
                </Grid.Col>
            </Grid>
            <Modal opened={isAdding} onClose={close} title="Add Password" centered>
                <TextInput
                    size="md"
                    label="Website"
                    value={addedPassword?.website}
                    onChange={(event) => setAddedPassword({ ...addedPassword, website: event.currentTarget.value })}
                    placeholder='e.g. "Google"'
                    required
                />

                <Radio.Group
                    value={selectedOption}
                    onChange={setSelectedOption}
                    label="Choose to enter either Username or Email"
                    mt={15}
                    required
                >
                    <Radio mt={2} value="username" label="Username" />
                    <Radio mt={7} value="email" label="Email" />
                </Radio.Group>

                {selectedOption === 'username' && (
                    <TextInput
                        size="md"
                        label="Username"
                        value={addedPassword?.username}
                        onChange={(event) => setAddedPassword({ ...addedPassword, username: event.currentTarget.value })}
                        mt={15}
                        placeholder='e.g. "john_doe123"'
                        required
                    />
                )}

                {selectedOption === 'email' && (
                    <TextInput
                        size="md"
                        label="Email"
                        value={addedPassword?.email}
                        onChange={(event) => setAddedPassword({ ...addedPassword, email: event.currentTarget.value })}
                        mt={15}
                        placeholder='e.g. "mantine@dev.com"'
                        required
                    />
                )}

                <TextInput
                    size="md"
                    label="Password"
                    value={addedPassword?.password}
                    onChange={(event) => setAddedPassword({ ...addedPassword, password: event.currentTarget.value })}
                    mt={15}
                    placeholder='e.g. "password123"'
                    required
                />
                <Button color="red" mt={15} onClick={close}>Cancel</Button>
                <Button color="blue" mt={15} ml={15} onClick={handleAdd}>Add</Button>
            </Modal>
        </Container>
    );
};
