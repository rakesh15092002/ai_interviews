import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the props with generics, so the component is reusable for any form schema
interface FormFeildProps<T extends FieldValues> {
  control: Control<T>;              // The form control object from useForm
  name: Path<T>;                    // The field name (must match schema)
  label: string;                    // Label to display for the input
  placeholder?: string;             // Optional placeholder for the input
  type?: "text" | "email" | "password" | "file"; // Input type
}

// Generic functional component
const FormFeild = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFeildProps<T>) => (
  // Use Controller to connect react-hook-form with custom input components
  <Controller
    name={name}                     // Field name to register
    control={control}               // Form control object
    render={({ field }) => (       // Render function to bind the input
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>

        <FormControl>
          <Input
            className="input"
            placeholder={placeholder}
            type={type}
            {...field}             // Spread all field props from RHF to input
          />
        </FormControl>

        {/* Optional field description if needed */}
        {/* <FormDescription>This is your public display name.</FormDescription> */}

        <FormMessage />          
      </FormItem>
    )}
  />
);

export default FormFeild;
