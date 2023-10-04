import React, { useState, useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AdminInpPanel from "./AdminInpPanel";
import { fbGet } from "../Config/firebaseMethod";

function AdminPanel() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [quizBtn, setQuizBtn] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fbGet("QuizDetails");
        setQuizBtn(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleQuizClick = async (btn) => {
    const secretKey = prompt("Enter Secret Key");
    if (secretKey !== null && secretKey.trim() !== "") {
      const validSecretKeys = quizBtn.map((quiz) => quiz.SecretKey);
      if (validSecretKeys.includes(secretKey)) {
        navigate('/quizscreen');
      } else {
        alert("Invalid Secret Key. Please try again.");
      }
    } else {
      alert("Secret Key is required.");
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <MuiDrawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
          <List>
            
            {quizBtn.map((btn, index) => (
              <ListItem key={index} onClick={() => handleQuizClick(btn)}>
                <ListItemButton>
                  <ListItemIcon>
                    {/* Icon for other buttons */}
                  </ListItemIcon>
                  <ListItemText primary={btn.QuizOpen} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button
            className="mt-auto mb-4 mx-auto"
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </MuiDrawer>
      </div>
      <AdminInpPanel />
    </>
  );
}

export default AdminPanel;
