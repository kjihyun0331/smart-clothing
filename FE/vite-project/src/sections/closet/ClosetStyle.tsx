// ${(props) => props.theme.colors.pointcolor};
import styled from "styled-components";

export const Filter = styled.div`
  width: 50%;
  border: 1px solid black;
  position: absolute;
  top: 6dvh;
  left: 0;
  background-color: grey;
`;

export const ClosetContent = styled.div`
  padding-top: 2rem;
  padding-bottom: 12dvh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background-color: ${(props) => props.theme.colors.backgroundcolor};
`;

export const Item = styled.div`
  width: 100%;
  padding: 5px 5px;

  .imgarea {
    width: 100%;
    aspect-ratio: 1/1;
    height: auto;
    border-radius: 10px;
    background-color: #9db49d;

    img {
      width: 100%;
      object-fit: fill;
    }
  }

  .keyword {
    margin-top: 4px;
    text-align: center;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 6dvh;
  position: sticky;
  top: 0;
  ${({ theme }) => theme.common.flexCenter};
  background-color: white;
  padding: 10px 8px 0 8px;
  max-width: 450px;
  min-width: 320px;

  .title {
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const DetailContent = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  padding-top: 1rem;
  padding-bottom: 13dvh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundcolor};

  .imgarea {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    aspect-ratio: 1/1;
    height: auto;
    border-radius: 10px;
    background-color: #9bceb4;
    padding: 10px 10px;

    img {
      width: 100%;
      object-fit: fill;
    }
  }

  .textarea {
    margin-top: 1rem;
    padding: 1rem 1rem 0 1rem;
    width: 90%;
    background-color: white;
    border-radius: 10px;
    ${({ theme }) => theme.common.flexCenterColumn};
  }

  .line {
    width: 95%;
    border-bottom: 1px solid #45ba8c3d;
    padding-bottom: 7px;
    margin-bottom: 1rem;
    display: flex;
  }

  .label {
    flex: 4;
    color: ${(props) => props.theme.colors.pointcolor};
    font-size: 1rem;
    line-height: 1.5;
  }

  .value {
    padding: 0 0;
    flex: 6;
    color: grey;
    font-size: 1rem;
    line-height: 1.5;
  }

  .btnarea {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .btn {
    border: none;
    width: 40%;
    color: white;
    padding: 0.7rem 1rem;
    border-radius: 40px;
  }

  .edit {
    background-color: ${(props) => props.theme.colors.pointcolor};
  }

  .delete {
    background-color: #cab0ae;
  }
`;

export const UpdateContent = styled.div`
  background-color: white;
  overflow-y: scroll;
  padding: 1rem 1rem 13dvh 1rem;
  margin: 1rem auto;
  width: 95%;
  border-radius: 10px;
  ${({ theme }) => theme.common.flexCenterColumn};

  .titlearea {
    width: 100%;
    border-bottom: 1px solid black;
    padding-bottom: 2px;
    font-weight: bold;
  }

  .tag {
    font-size: 0.8rem;
    margin: 0px 3px;
    position: relative;
    font-weight: 400;
    padding: 3px 5px;
    opacity: 0.6;
    border-radius: 8px;
    line-height: 1.5rem;
    background-color: ${(props) => props.theme.colors.pointcolor};
  }

  input {
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.colors.backgroundcolor};
    font-size: large;
    margin-top: 8px;
    margin-bottom: 1.6rem;
    width: 95%;
    height: 2rem;
    border-radius: 15px;
  }

  input:focus {
    border: 1px solid ${(props) => props.theme.colors.pointcolor};
  }

  .month {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    margin: 10px 0 20px 0;
  }

  .month-tag {
    border: none;
    background-color: aliceblue;
    padding: 8px 10px;
    margin: 2px 2px;
    border-radius: 5px;
  }

  .finish {
    width: 80%;
    height: 2rem;
    ${({ theme }) => theme.common.PointButton};
  }
`;
