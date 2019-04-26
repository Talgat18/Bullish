import React from "react";
import Particles from "react-particles-js";

const Parts = () => {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 200
          },
          color: {
            value: "#f1c40f"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 1,
              color: "#ccc"
            }
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1
            }
          },
          size: {
            value: 6,
            random: false,
            anim: {
              enable: false,
              speed: 30
            }
          },
          line_linked: {
            enable: true,
            distance: 120,
            color: "#2c3e50",
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            straight: false
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            repulse: {
              distance: 40,
              duration: 0.5
            },
            bubble: {
              distance: 60,
              size: 10
            }
          }
        }
      }}
    />
  );
};

export default Parts;
