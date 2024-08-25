'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';

const backInventory = () => {

  const router = useRouter();

  const [formDataArray, setFormDataArray] = useState ([{
    bd_id: uuidv4(),
    item_name: "",
    item_stocks: "",
    unit: "",
    category: "",
    location_shelf: "",
    stock_in_date: "",
    expiry_date: "",
    stock_damaged: "",
    po_id: "",
  }]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormDataArray = [...formDataArray];
   
    newFormDataArray[index] = { ...newFormDataArray[index], [e.target.name]: e.target.value };
    setFormDataArray(newFormDataArray);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLSelectElement>) => {
    e.preventDefault();
    try{

      const formattedDataArray = formDataArray.map(formData => ({
        ...formData,
        stock_in_date: formData.stock_in_date ? formData.stock_in_date + 'T00:00:00Z' : '',
        expiry_date: formData.expiry_date ? formData.expiry_date + 'T00:00:00Z' : '',
      }));

        await fetch('/api/back_inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedDataArray)
        })
        router.push('/BackInventory');
    } catch(error){
        console.log(error);
    }
  };

  const addNewRow = () => {
    setFormDataArray([...formDataArray, {
      bd_id: uuidv4(),
      item_name: "",
      item_stocks: "",
      unit: "",
      category: "",
      location_shelf: "",
      stock_in_date: "",
      expiry_date: "",
      stock_damaged: "",
      po_id: "",
    }]);
  }
  
  return (
    <div className="mt-24 ml-40 mr-40">
      <p className="flex text-3xl text-[#483C32] font-bold justify-center mb-2">
        Back Inventory
      </p>
      <form onSubmit={handleSubmit}>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Item Name</TableHead>
                    <TableHead>Stocks</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Shelf Location</TableHead>
                    <TableHead>Stock-In Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Recent PO ID</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
              {formDataArray.map((formData, index) => (
                <TableRow key={formData.bd_id}>
                    <TableCell className="font-medium"><input type="text" name="item_name" value={formData.item_name} onChange={(e) => handleChange(index, e)} /></TableCell>
                    <TableCell><input type="number" name="item_stocks" value={formData.item_stocks} onChange={(e) => handleChange(index, e)} /></TableCell>
                    <TableCell><select name="unit" value={formData.unit} onChange={(e) => handleChange(index, e)}>
                        <option value="" disabled hidden> Select Unit of Measurement</option>
                        <option value="bag">Bag</option>
                        <option value="box">Box</option>
                        <option value="bottle">Bottle</option>
                        <option value="slice">Slice</option>
                        <option value="pack">Pack</option>
                    </select></TableCell>
                    <TableCell><select name="category" value={formData.category} onChange={(e) => handleChange(index, e)}>
                        <option value="" disabled hidden> Select Category</option>
                        <option value="syrup">Syrup</option>
                        <option value="pasta">Pasta</option>
                        <option value="coffee beans">Coffee Beans</option>
                        <option value="pastries">Pastries</option>
                        <option value="alcohol">Alcohol</option>
                    </select></TableCell>
                    <TableCell><input type="text" name="location_shelf" value={formData.location_shelf} onChange={(e) => handleChange(index, e)} /></TableCell>
                    <TableCell><input type="date" name="stock_in_date" value={formData.stock_in_date} onChange={(e) => handleChange(index, e)} /></TableCell>
                    <TableCell><input type="date" name="expiry_date" value={formData.expiry_date} onChange={(e) => handleChange(index, e)} /></TableCell>
                    <TableCell><input type="number" name="po_id" value={formData.po_id} onChange={(e) => handleChange(index, e)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        <div className="flex flex-row gap-3 justify-end">
          <Button variant="outline" onClick={addNewRow}>Add Item</Button>
          <Button variant="outline" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
export default backInventory;


// const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLSelectElement>) => {
//   e.preventDefault();
//   try{

//     const formattedDataArray = formDataArray.map(formData => ({
//       ...formData,
//       stock_in_date: formData.stock_in_date ? formData.stock_in_date + 'T00:00:00Z' : '',
//       expiry_date: formData.expiry_date ? formData.expiry_date + 'T00:00:00Z' : '',
//     }));
    
//       await fetch('/api/back_inventory', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               item_name: formData.item_name,
//               item_stocks: formData.item_stocks,
//               unit: formData.unit,
//               category: formData.category,
//               location_shelf: formData.location_shelf,
//               stock_in_date: formData.stock_in_date + 'T00:00:00Z',
//               expiry_date: formData.expiry_date + 'T00:00:00Z',
//               stock_damaged: formData.stock_damaged,
//               po_id: formData.po_id,

//           })
//       })
//       router.refresh();
//   } catch(error){
//       console.log(error);
//   }
// }