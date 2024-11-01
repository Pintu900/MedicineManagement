<template>
  <div>
    <h2>Medicine List</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Medicine Name</th>
          <th>Quantity</th>
          <th>Box</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medicine in medicines" :key="medicine.id">
          <td>{{ medicine.id }}</td>
          <td>{{ medicine.med_name }}</td>
          <td>{{ medicine.quantity }}</td>
          <td>{{ medicine.med_box }}</td>
        </tr>
        <tr v-if="medicines.length === 0">
          <td colspan="6">No medicines available.</td>
        </tr>
      </tbody>
    </table>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; // Adjust the path to your supabase.js file

export default {
  setup() {
    const medicines = ref([]);
    const message = ref('');

    // Fetch all medicines from the database
    const fetchMedicines = async () => {
      const { data, error } = await supabase.from('medicine').select('*');
      if (error) {
        console.error('Error fetching medicines:', error);
        message.value = 'Error fetching medicines. Please try again later.';
      } else {
        medicines.value = data || [];
      }
    };

    // Format price to a readable format (e.g., $10.00)
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };

    // Edit medicine logic (you can implement your own logic here)
    const editMedicine = (id) => {
      // For example, navigate to an edit page or show a modal
      console.log(`Edit medicine with ID: ${id}`);
    };

    // Delete medicine logic
    const deleteMedicine = async (id) => {
      const { error } = await supabase.from('medicine').delete().eq('id', id);
      if (error) {
        console.error('Error deleting medicine:', error);
        message.value = 'Error deleting medicine. Please try again later.';
      } else {
        message.value = 'Medicine deleted successfully.';
        fetchMedicines(); // Refresh the list
      }
    };

    // Fetch medicines when the component is mounted
    onMounted(fetchMedicines);

    return {
      medicines,
      message,
      formatPrice,
      editMedicine,
      deleteMedicine,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #007bff;
  color: white;
}
</style>
