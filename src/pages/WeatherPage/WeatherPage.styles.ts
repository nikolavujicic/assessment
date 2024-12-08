import styled from 'styled-components';

export const WeatherContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;


export const WeatherHeader = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
`;

export const CityInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const WeatherData = styled.div`
  text-align: center;

  h4 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: #007bff;
  }

  p {
    font-size: 1rem;
    margin: 4px 0;
    color: #555;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 1rem;
  text-align: center;
`;

export const LoadingMessage = styled.p`
  color: #333;
  font-size: 1rem;
  text-align: center;
`;
