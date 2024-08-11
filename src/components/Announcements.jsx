import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #2a883ba9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-weight: bold;
  color: #ffffff;
`;

const Announcements = () => {
  return (
    <Container>
      <Text>SUMMER SALE 👉 UPTO 30%-40% OFF</Text>
    </Container>
  );
};

export default Announcements;
