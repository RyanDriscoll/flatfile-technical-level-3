import styled from 'styled-components'

export const ToastErrorContent = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);

  p {
    text-align: center;
    border-radius: 3px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    position: relative;
    padding: 10px;
  }
`
