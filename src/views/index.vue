<script setup lang="ts">
const tableData = [
  { date: '2023-10-01', name: 'John Doe', address: '123 Main St' },
  { date: '2023-10-02', name: 'Jane Smith', address: '456 Elm St' },
  { date: '2023-10-03', name: 'Alice Johnson', address: '789 Oak St' },
]
</script>

<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table><el-table :data="tableData" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table><el-table :data="tableData" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table><el-table :data="tableData" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table><el-table :data="tableData" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table><el-table :data="tableData" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>
