import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";

const Thing = styled(animated.div)`
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  cursor: default;
  border-radius: 5px;

  @media (min-width: 900px) {
    top: 10px;
    right: 10px;
    width: 500px;
  }

  @media (max-width: 900px) {
    top: unset;
    right: 10%;
    width: 80%;
    bottom: 4%;
  }

  @media (max-width: 600px) {
    right: 2%;
    width: 96%;
    bottom: 4%;
  }
`;

const StyledGithubLink = styled(animated.a)`
  position: fixed;

  @media (min-width: 451px) {
    top: 15px;
    right: 15px;
  }

  @media (max-width: 450px) {
    right: 40px;
    bottom: 6px;
  }
`;

function Card({ children, isRight, isClosed, setIsClosed }) {
  const animation = useSpring({
    transform: "translateX(0px)",
    opacity: isClosed ? 0 : 1,
    from: { transform: "translateX(50px)", opacity: 0 },
    delay: !isClosed && 300
  });

  return (
    <Thing style={animation}>
      <div
        style={{
          position: "absolute",
          right: 5,
          top: 5,
          cursor: "pointer"
        }}
      >
        <MdClose
          onClick={() => {
            setIsClosed(true);
          }}
        />
      </div>
      {children}
    </Thing>
  );
}

export default function WelcomeMessage() {
  const [isClosed, setIsClosed] = useState(false);

  const animation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 95
  });

  return (
    <>
      <Card isClosed={isClosed} setIsClosed={setIsClosed}>
        <div
          style={{
            padding: "15px 25px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ marginRight: 20 }}>
            <FaGlobeAmericas size={40} color="purple" />
          </div>
          <span>
            Welcome to the map visualization tool. I explore how render
            different metrics on a map while maintaining simple UI/UX. Link to
            github?
          </span>
        </div>
      </Card>
      {isClosed && (
        <StyledGithubLink style={animation} href="https://www.github.com">
          <AiFillGithub size={30} color="black" />
        </StyledGithubLink>
      )}
    </>
  );
}
