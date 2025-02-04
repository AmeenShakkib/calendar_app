import React from 'react';
import {useNavigate} from 'react-router-dom';
import './home.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () => {
    const navigate = useNavigate();
    console.log(history);
    const particlesInit = async (main) => {
        // This loads the tsparticles package
        await loadFull(main);
      };
    
      const particlesLoaded = (container) => {
        console.log(container);
      };
    
    return (   
        <div style={{height: "100vh", width: "100vw",display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center",flexWrap: "wrap", }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#151750", // Background color
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push", // Add particles on click
                },
                onHover: {
                  enable: true,
                  mode: "bubble", // Bubble effect on hover
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                bubble: {
                  distance: 200,
                  duration: 2,
                  size: 10,
                  opacity: 0.8,
                },
              },
            },
            particles: {
              color: {
                value: "#C2CBF8", // Particle color
              },
              links: {
                color: "#ffc0cb",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 0,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800, // Particle density
                },
                value: 100, // Number of particles
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "star", // Particle shape
              },
              size: {
                value: { min: 1, max: 5 }, // Particle size
              },
            },
            detectRetina: true,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ffffff",
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <h1 style={{ fontSize: "4rem", fontWeight: "bold", textShadow: "2px 2px 4px #C2CBF8" }}>BIRTHDAY MANAGER</h1>
            <h2 style={{ fontSize: "2rem", fontStyle: "bold", textShadow: "1px 1px 2px #C2CBF8" }}>Never Miss a Birthday Again</h2>
            <button onClick = {() => navigate('/addBirthday')}>Lets get started</button>
        </div>
      </div>
    );
};

export default Home;