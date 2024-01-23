import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'Products',
    initialState: [{name:'totalItems',quantity:0,category:''}],
    reducers: {
        incrementProduct: (state,action) =>
        {
          if(!action.payload.name || !action.payload.category) return;
          let isNewProduct=true;
          state= state.map(product=>{
            if (product.name===action.payload.name){
              isNewProduct=false;
              return {...product,quantity:product.quantity+1};
            }
            return product;
          })
          if(isNewProduct){
            state.push({name:action.payload.name,quantity:1,category:action.payload.category})
          }
          state[0]={...state[0],quantity:state[0].quantity+1};
          return state;
        },
      },
  });
export const { incrementProduct } = counterSlice.actions;
export default counterSlice.reducer;