import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { useIsFocused } from "@react-navigation/native";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
// import listingApi from '../api/Listing'
import UpLoadScreen from "../components/lists/UpLoadScreen";
import ticketApi from "../api/ticket";
import AuthContext from '../app/auth/context';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  
});

const categories = [
  {
    backgroundColor: "#909090",
    icon: "desk",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#909090",
    icon: "projector",
    label: "Projector",
    value: 2,
  },
  {
    backgroundColor: "#909090",
    icon: "signal",
    label: "Network Connection",
    value: 3,
  },
  {
    backgroundColor: "#909090",
    icon: "battery-charging",
    label: "Electrical Needs",
    value: 4,
  },
  {
    backgroundColor: "#909090",
    icon: "desktop-mac",
    label: "System Issues",
    value: 5,
  },
  {
    backgroundColor: "#909090",
    icon: "bus",
    label: "Transport",
    value: 6,
  },
  {
    backgroundColor: "#909090",
    icon: "tablet",
    label: "Smart Boards",
    value: 7,
  },
  {
    backgroundColor: "#909090",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#909090",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const RaiseTicketScreen = () => {

  const authContext=useContext(AuthContext)

    const [uploadVisible,setUploadVisible]=useState(false);
 const [progress, setProgress]=useState(0);
  const location = useLocation();

  async function handleSubmit({title,description,category}){
    const result=await ticketApi.create(title,description,category.label,authContext.user._id)
    // console.log(result);
  }

//   const handleSubmit=async(listing,{resetForm})=>{
//     setUploadVisible(true)
//     // console.log(listing);
//     const result=listingApi.addListing(listing,(progress)=>setProgress(progress))
//     setUploadVisible(false)
//     // console.log(result);
//     // if(!result.ok)  return alert('could not save the listing')
//     //  alert('success');
//     // console.log(result.ok)
//     if(!result) return alert('could not save listing')
//     alert('success')
//     resetForm();
//   }
    return (
        <>
        


     <Screen style={styles.container}>
       <UpLoadScreen progress={progress} visible={uploadVisible} />
       <Form
        initialValues={{
          title: "",
          description: "",
          category: null,
        }}
        onSubmit={handleSubmit}
        // onSubmit={(values)=>handleSubmit(values)}
        validationSchema={validationSchema}
      >
        
        <FormField maxLength={255} name="title" placeholder="Title" />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
        </>
    )
}

export default RaiseTicketScreen;

const styles = StyleSheet.create({
    
})