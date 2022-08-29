import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormContainer from '../Inputs/FormContainer';
import TextField from '../Inputs/TextField';
import * as Yup from 'yup';
import { ExpenseType } from '../../types/expense';

type FormSubmitType = {
  name: string;
  amount: string;
};

type EditProjectType = {
  expense: ExpenseType;
  onClose: () => void;
};

const EditExpense: React.FC<EditProjectType> = ({ expense, onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
    amount: Yup.number().nullable().required('Expense is required'),
  });

  const initialValues = {
    name: expense.name || '',
    amount: expense.amount || '',
  };

  const handleFormSubmit = (values: FormSubmitType) => {
    console.log('Form Values: ', values);
  };

  const isEdit = !!expense?.id;

  return (
    <Dialog open={true} maxWidth="sm" fullWidth onClose={onClose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {isEdit ? 'Edit Expense' : 'Create Expense'}
        </Typography>

        <IconButton color="primary" onClick={onClose}>
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      <Box p={4} pt={0}>
        <FormContainer
          validation={validationSchema}
          defaultValues={initialValues}
          onSuccess={handleFormSubmit}
        >
          <Stack spacing={2}>
            <TextField fullWidth name="name" variant="outlined" label="Name" />

            <TextField
              fullWidth
              name="amount"
              variant="outlined"
              label="Amount"
            />

            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ ml: 2 }}
              >
                OK
              </Button>
            </Box>
          </Stack>
        </FormContainer>
      </Box>
    </Dialog>
  );
};

export default EditExpense;
