import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #69d17c;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: #2c2727fb;
`;

const Announcements = () => {
  return (
    <Container>
      <Text>SUMMER SALE 👉 UPTO 30%-40% OFF</Text>
    </Container>
  );
};

export default Announcements;
