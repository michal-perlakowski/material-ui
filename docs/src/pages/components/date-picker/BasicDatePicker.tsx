import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
// eslint-disable-next-line no-restricted-imports
import PickersToolbar from '@material-ui/lab/internal/pickers/PickersToolbar';
// eslint-disable-next-line no-restricted-imports
import { ToolbarComponentProps } from '@material-ui/lab/internal/pickers/typings/BasePicker';

function ToolbarComponent(props: ToolbarComponentProps<Date | null>) {
  return (
    <PickersToolbar
      toolbarTitle=""
      {...props}
    />
  );
}

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        ToolbarComponent={ToolbarComponent}
      />
    </LocalizationProvider>
  );
}
