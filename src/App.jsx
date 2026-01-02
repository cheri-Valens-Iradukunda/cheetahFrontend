import './bootstrap.css';
import "./App.css"
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RequireAuth } from "react-auth-kit";
import AppLogin from './components/AppLogin';
import ManageUsers from './components/ManageUsers';
import { AddImport } from './component2/imports/Imports';
import { ImportTable } from './component2/imports/ImportsTable';
import { AddExport } from './component2/exports/Exports';
import { DisplayExport } from './component2/exports/DisplayExports';
import { Pending } from './component2/deleted/Pending';
import { Approved } from './component2/deleted/Approved';
import { SellCredits } from './component2/credits/Sales';
import Expense, { ExpenseForm } from './component2/expenses/Expenses';
import { ExpenseTable } from './component2/expenses/ExpenseTable';
import Damaged, { DamagedForm } from './component2/damages/DamagedForm';
import { DamagedTable } from './component2/damages/DamagedTable';
import { DailyReport } from './component2/report/DailyReport';
import { MonthlyReport } from './component2/report/MonthlyReport';
import { ProductTable } from './component2/products/ProductsTable';
import { AddProduct } from './component2/products/ProductsForm';
import { ResultDisplay } from './component2/DisplayResults';
import { ExpensesPending } from './component2/expenses/Pending';
import { ExpensesApproved } from './component2/expenses/Approved';
import { DamagedApproved } from './component2/damages/Approved';
import { DamagedPending } from './component2/damages/Pending';
import { InsertTools } from './component2/tools/InsertTools';
import { Dashboard } from './component2/tools/Dashboard';
import { AddRateImport } from './component2/rateActions/Imports';
import { AddRateExport } from './component2/rateActions/Exports';
import { Comvert } from './component2/comvert/Comvert';
import { ComvertPending } from './component2/comvert/Pending';
import { ComvertApproved } from './component2/comvert/Approved';
import { HeadNav } from './component2/navbar/HeadNav';
import { LeftSideNav } from './component2/navbar/LeftSideNav';
import { ChangePrice } from './component2/comvert/ChangePrice';
import { RateExpenseForm } from './component2/rateActions/Expenses';
import { RateDamagedForm } from './component2/rateActions/DamagedForm';
import { ProductPending } from './component2/products/ProductPending';

function App() {
  const token = localStorage.getItem("token")
  const isLogin = localStorage.getItem("isLogin")
  console.log("---------------------------------" + token)
  
  const location = useLocation()
  const path = location.pathname
  console.log(path)

  if(path == "/"){
    localStorage.removeItem("token");
  }

  return (

    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeadNav />
          </div>
          <div className="col-md-2 navs">
            <LeftSideNav />
          </div>
          <div className="col-md-10">
            <div className='mainClass'>
              <Routes>
                <Route path="/users" element={
                  <RequireAuth loginPath="/"><ManageUsers />
                  </RequireAuth>
                }></Route>
                <Route path="/importForm" element={
                  <RequireAuth loginPath="/"><AddImport /></RequireAuth>
                }></Route>
                <Route path="/importTable" element={
                  <RequireAuth loginPath="/"><ImportTable /></RequireAuth>
                }></Route>
                <Route path="/exportForm" element={
                  <RequireAuth loginPath="/"><AddExport /></RequireAuth>
                }></Route>
                <Route path="/exportTable" element={
                  <RequireAuth loginPath="/"><DisplayExport /></RequireAuth>
                }></Route>
                <Route path="/deletedPendings" element={
                  <RequireAuth loginPath="/"><Pending /></RequireAuth>
                }></Route>
                <Route path="/deletedApproved" element={
                  <RequireAuth loginPath="/"><Approved /></RequireAuth>
                }></Route>
                <Route path="/salesCredit" element={
                  <RequireAuth loginPath="/"><SellCredits /></RequireAuth>
                }></Route>
                <Route path="/dailyReport" element={
                  <RequireAuth loginPath="/"><DailyReport /></RequireAuth>
                }></Route>
                <Route path="/monthlyReport" element={
                  <RequireAuth loginPath="/"><MonthlyReport /></RequireAuth>
                }></Route>
                <Route path="/productTable" element={
                  <RequireAuth loginPath="/"><ProductTable /></RequireAuth>
                }></Route>
                <Route path="/productForm" element={
                  <RequireAuth loginPath="/"><AddProduct /></RequireAuth>
                }></Route>
                <Route path="/login" element={
                  <RequireAuth loginPath="/"><AppLogin /></RequireAuth>
                }></Route>
                <Route path="/expenseForm" element={
                  <RequireAuth loginPath="/"><ExpenseForm /></RequireAuth>
                }></Route>
                <Route path="/expensesPendings" element={
                  <RequireAuth loginPath="/"><ExpensesPending /></RequireAuth>
                }></Route>
                <Route path="/expensesApproved" element={
                  <RequireAuth loginPath="/"><ExpensesApproved /></RequireAuth>
                }></Route>
                <Route path="/damagedForm" element={
                  <RequireAuth loginPath="/"><DamagedForm /></RequireAuth>
                }></Route>
                <Route path="/damagedPendings" element={
                  <RequireAuth loginPath="/"><DamagedPending /></RequireAuth>
                }></Route>
                <Route path="/damagedApproved" element={
                  <RequireAuth loginPath="/"><DamagedApproved /></RequireAuth>
                }></Route>
                <Route path="/insertTool" element={
                  <RequireAuth loginPath="/"><InsertTools /></RequireAuth>
                }></Route>
                
                <Route path="/viewTools" element={
                  <RequireAuth loginPath="/"><Dashboard /></RequireAuth>
                }></Route>
                <Route path="/rateImport" element={
                  <RequireAuth loginPath="/"><AddRateImport /></RequireAuth>
                }></Route>
                <Route path="/rateExport" element={
                  <RequireAuth loginPath="/"><AddRateExport /></RequireAuth>
                }></Route>
                <Route path="/comvert" element={
                  <RequireAuth loginPath="/"><Comvert /></RequireAuth>
                }></Route>
                
                <Route path="/comvertPending" element={
                  <RequireAuth loginPath="/"><ComvertPending /></RequireAuth>
                }></Route>

                <Route path="/changePrice" element={
                  <RequireAuth loginPath="/"><ChangePrice /></RequireAuth>
                }></Route>
                
                <Route path="/comvertApproved" element={
                  <RequireAuth loginPath="/"><ComvertApproved /></RequireAuth>
                }></Route>
                <Route path="/rateExpenses" element={
                  <RequireAuth loginPath="/"><RateExpenseForm /></RequireAuth>
                }></Route>
                <Route path="/rateDamages" element={
                  <RequireAuth loginPath="/"><RateDamagedForm /></RequireAuth>
                }></Route>
                <Route path="/pendingProducts" element={
                  <RequireAuth loginPath="/"><ProductPending /></RequireAuth>
                }></Route>
                <Route path="/checkReturn" element={
                  <ResultDisplay />
                }></Route>
                <Route path="/" element={
                  <AppLogin />
                }></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
      
      
    </>
  );
}

export default App;
