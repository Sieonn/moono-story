import React from 'react';
import { TextField } from '@mui/material';

const BoardInput = (props: any) => {
  return (
    <TextField
      variant="standard"
      style={{ width: '100%' }}
      sx={{
        '& .MuiInput-underline:before': {
          borderBottom: '2px solid',
          borderColor: '#8a8a8a',
        },
        '& .MuiInput-underline:after': {
          borderBottom: '2px solid',
          borderColor: '#EA3636',
        },
        '& .MuiInput-underline:hover:before': {
          borderBottom: '2px solid',
          borderColor: 'black',
        },
        '& .MuiInputBase-input': {
          color: '#fff', // 입력 텍스트 색상
          paddingLeft: '15px', // 왼쪽 패딩
        },
      }}
      InputProps={{
        style: { color: '#fff' }, // 입력 텍스트 색상
      }}
      {...props}
    />
  );
};

export default BoardInput;
