import React, { useState } from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const avatarsPerPage = 4;

interface Contact {
    name: string;
    pixKey: string;
}

const QuickTransfer = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAddAvatarDialogOpen, setAddAvatarDialogOpen] = useState(false);
    const [newAvatarName, setNewAvatarName] = useState("");
    const [newPixKey, setNewPixKey] = useState("");
    const [contacts, setContacts] = useState([
        { name: "Kent Dodds", pixKey: "kent@example.com" },
        // ... outros contatos ...
    ]);

    const totalPages = Math.ceil(contacts.length / avatarsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const handleAvatarClick = (contact: Contact) => {
        console.log(`Clicou no avatar de ${contact.name}`);
    };

    const handleAddAvatarClick = () => {
        setAddAvatarDialogOpen(true);
    };

    const handleAddAvatar = () => {
        if (newAvatarName.trim() === "" || newPixKey.trim() === "") {
            // Adicione validação ou exiba uma mensagem de erro
            return;
        }

        setContacts((prevContacts) => [
            ...prevContacts,
            { name: newAvatarName, pixKey: newPixKey },
        ]);
        setAddAvatarDialogOpen(false);
        setNewAvatarName("");
        setNewPixKey("");
    };

    const handleCloseAddAvatarDialog = () => {
        setAddAvatarDialogOpen(false);
    };

    const renderAvatars = () => {
        const startIndex = currentPage * avatarsPerPage;
        const endIndex = Math.min(startIndex + avatarsPerPage, contacts.length);

        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <Button
                    onClick={handleAddAvatarClick}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box marginRight={2} marginTop={-1.5}>
                        <Avatar sx={{ width: 80, height: 80, background: "white" }}>
                            <AddOutlinedIcon style={{ color: "black" }} sx={{ width: 40, height: 40 }} />
                        </Avatar>
                        <Typography color="white" sx={{ textAlign: "center", marginTop: 1 }}>
                            Add New
                        </Typography>
                    </Box>
                </Button>
                <Box display="flex" flexDirection="row" alignItems="center">
                    {contacts.slice(startIndex, endIndex).map((contact) => (
                        <Button key={contact.pixKey} onClick={() => handleAvatarClick(contact)}>
                            <Box marginRight={2}>
                                <Avatar sx={{ width: 80, height: 80 }}/>
                                <Typography color="white" sx={{ textAlign: "center" }}>
                                    {contact.name
                                        .split(" ")
                                        .slice(0, 2)
                                        .map((part, i) => (
                                            <React.Fragment key={i}>
                                                {part}
                                                {i < 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                </Typography>
                            </Box>
                        </Button>
                    ))}
                </Box>
            </Box>
        );
    };

    return (
        <Box>
            {renderAvatars()}
            <Box>
                <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Página Anterior
                </Button>
                <Button onClick={handleNextPage}>Próxima Página</Button>
            </Box>
            <React.Fragment>
                <Dialog open={isAddAvatarDialogOpen} onClose={handleCloseAddAvatarDialog}>
                    <DialogTitle>Add New Quick Transfer</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a Quick Transfer, add the name and pix key.
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome"
                            value={newAvatarName}
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNewAvatarName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Chave PIX"
                            value={newPixKey}
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNewPixKey(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleCloseAddAvatarDialog}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleAddAvatar}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Box>
    );
};

export default QuickTransfer;
