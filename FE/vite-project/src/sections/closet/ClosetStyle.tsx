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

export const Content = styled.div`
  padding-top: 10dvh;
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
  position: fixed;
  height: 6dvh;
  ${({ theme }) => theme.common.flexCenter};
  background-color: white;
  padding: 10px 8px 0 8px;
  width: 100%;
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
  padding-top: 12dvh;
  padding-bottom: 13dvh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundcolor};

  .imgarea {
    width: 60%;
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
    padding: 0.5rem 1rem;
    border-radius: 40px;
  }

  .edit {
    background-color: ${(props) => props.theme.colors.pointcolor};
  }

  .delete {
    background-color: #cab0ae;
  }
`;
