import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PageHeader = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TaskItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    div {
      margin-top: 10px;
    }
  }
`;


export const TaskText = styled.div`
  flex-grow: 1;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      opacity: 0.9;
    }

    &.edit {
      background-color: #007bff;
    }

    &.delete {
      background-color: #ff4d4f;
    }
  }
`;

export const AddButton = styled.button`
  align-self: center;
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;
