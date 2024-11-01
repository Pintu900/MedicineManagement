<template>
  <div>
    <h1>Add New Batch</h1>
    <form @submit.prevent="addBatch">
      <label>
        Medicine ID:
        <select v-model="batch.medicine_id" required>
          <option value="" disabled>Select Medicine</option>
          <option
            v-for="medicine in medicines"
            :key="medicine.id"
            :value="medicine.id"
          >
            {{ medicine.med_name }}
          </option>
        </select>
      </label>
      <label>
        Batch Number:
        <input type="text" v-model="batch.batch_num" required />
      </label>
      <label>
        Quantity:
        <input type="number" v-model="batch.quantity" required />
      </label>
      <label>
        Rate:
        <input type="number" v-model="batch.rate" required />
      </label>
      <label>
        MRP:
        <input type="number" v-model="batch.mrp" required />
      </label>
      <label>
        Expiry Date:
        <input type="date" v-model="batch.expiry" required />
      </label>
      <button type="submit">Add Batch</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; // Adjust the path to your supabase.js file

export default {
  setup() {
    const batch = ref({
      medicine_id: null,
      batch_num: '',
      quantity: 0,
      rate: 0,
      mrp: 0,
      expiry: '',
    });

    const medicines = ref([]);
    const message = ref('');

    // Fetch medicines from the database
    const fetchMedicines = async () => {
      const { data, error } = await supabase.from('medicine').select('*');

      if (error) {
        console.error('Error fetching medicines:', error);
      } else {
        medicines.value = data;
      }
    };

    // Function to add a new batch to the database
    const addBatch = async () => {
      try {
        const { data, error } = await supabase.from('batch').insert([
          {
            medicine_id: batch.value.medicine_id,
            batch_num: batch.value.batch_num,
            quantity: batch.value.quantity,
            rate: batch.value.rate,
            mrp: batch.value.mrp,
            expiry: batch.value.expiry,
          },
        ]);

        if (error) {
          throw new Error(`Error adding batch: ${error.message}`);
        }

        message.value = 'Batch added successfully!';
        // Reset the form after successful submission
        batch.value = {
          medicine_id: null,
          batch_num: '',
          quantity: 0,
          rate: 0,
          mrp: 0,
          expiry: '',
        };
      } catch (error) {
        message.value = error.message;
      }
    };

    // Fetch medicines when the component is mounted
    onMounted(fetchMedicines);

    return {
      batch,
      medicines,
      addBatch,
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
