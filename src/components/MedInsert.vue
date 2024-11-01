<template>
  <div>
    <h1>Add New Medicine</h1>
    <form @submit.prevent="addMedicine">
      <label>
        Medicine Name:
        <input type="text" v-model="medicine.med_name" required />
      </label>
      <label>
        Box:
        <input type="text" v-model="medicine.med_box" required />
      </label>
      <button type="submit">Add Medicine</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase'; // Adjust the path to your supabase.js file

export default {
  setup() {
    const medicine = ref({
      med_name: '',
      box: '',
    });

    const message = ref('');

    // Function to add a new medicine to the database
    const addMedicine = async () => {
      try {
        const { data, error } = await supabase.from('medicine').insert([
          {
            med_name: medicine.value.med_name,
            med_box: medicine.value.med_box,
          },
        ]);

        if (error) {
          throw new Error(`Error adding medicine: ${error.message}`);
        }

        message.value = 'Medicine added successfully!';
        // Reset the form after successful submission
        medicine.value = {
          med_name: '',
          med_box: '',
        };
      } catch (error) {
        message.value = error.message;
      }
    };

    return {
      medicine,
      addMedicine,
      message,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

label {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}
</style>
