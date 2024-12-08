import styled from 'styled-components';

export const StyledNav = styled.nav`
  position:relative;
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #007bff;
  padding: 16px;
  border-radius: 8px;
  margin: 20px auto;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    transition: color 0.2s;

    &:hover {
      color: #ffdd57;
    }
  }

  .active {
    color: #ffdd57; 
    border-bottom: 2px solid #ffdd57;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;


export const ContentArea = styled.div`
  margin: 20px auto;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
`;

export const LogoutButton = styled.button`
  position: absolute;
  right:16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #ff7875;
  }
`;