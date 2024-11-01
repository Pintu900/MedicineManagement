<template>
  <div>
    <h2>Batch List</h2>
    <div class="search-container">
      <select v-model="searchCriteria" class="search-dropdown">
        <option value="batch_num">Search by Batch Number</option>
        <option value="medicine_name">Search by Medicine Name</option>
      </select>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Enter search term"
        class="search-input"
        @keyup.enter="fetchBatches"
      />
      <button @click="fetchBatches" class="search-button">Search</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Medicine Name</th>
          <th>Batch Number</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>MRP</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="batch in batches" :key="batch.id">
          <td>{{ batch.id }}</td>
          <td>{{ getMedicineName(batch.medicine_id) }}</td>
          <td>{{ batch.batch_num }}</td>
          <td>{{ batch.quantity }}</td>
          <td>{{ batch.rate }}</td>
          <td>{{ batch.mrp }}</td>
          <td>{{ formatDate(batch.expiry) }}</td>
        </tr>
        <tr v-if="batches.length === 0">
          <td colspan="7">No batches available.</td>
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
    const batches = ref([]);
    const medicines = ref([]);
    const searchQuery = ref('');
    const searchCriteria = ref('batch_num'); // Default search by batch number
    const message = ref('');

    // Fetch all medicines from the database
    const fetchMedicines = async () => {
      const { data, error } = await supabase.from('medicine').select('*');
      if (error) {
        console.error('Error fetching medicines:', error);
        message.value = 'Error fetching medicines. Please try again later.';
      } else {
        medicines.value = data;
      }
    };

    // Fetch batch data from the database based on the search query
    const fetchBatches = async () => {
      let query;

      try {
        if (searchCriteria.value === 'batch_num') {
          query = supabase
            .from('batch')
            .select('*')
            .eq('batch_num', searchQuery.value);
        } else if (searchCriteria.value === 'medicine_name') {
          const medicine = medicines.value.find(
            (med) =>
              med.med_name.toLowerCase() === searchQuery.value.toLowerCase()
          );
          if (medicine) {
            query = supabase
              .from('batch')
              .select('*')
              .eq('medicine_id', medicine.id);
          } else {
            message.value = 'No medicine found with that name.';
            batches.value = [];
            return;
          }
        }

        const { data, error } = await query;

        if (error) {
          throw error; // Throws error to be caught by the catch block
        } else {
          batches.value = data || [];
          message.value = batches.value.length
            ? ''
            : 'No batches found for the given criteria.';
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
        message.value = 'Error fetching batches. Please try again later.';
      }
    };

    // Fetch all batches and medicines when the component is mounted
    const fetchAllBatches = async () => {
      await fetchMedicines(); // Fetch medicines for mapping names
      // Fetch initial batches (can be empty)
    };

    // Format date to a readable format
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get the medicine name based on medicine_id
    const getMedicineName = (medicineId) => {
      const medicine = medicines.value.find((med) => med.id === medicineId);
      return medicine ? medicine.med_name : 'Unknown Medicine';
    };

    // Fetch all batches and medicines when the component is mounted
    onMounted(fetchAllBatches);

    return {
      batches,
      searchQuery,
      searchCriteria,
      message,
      formatDate,
      fetchBatches,
      getMedicineName,
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

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-dropdown {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-button {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
  color: red;
}
</style>
