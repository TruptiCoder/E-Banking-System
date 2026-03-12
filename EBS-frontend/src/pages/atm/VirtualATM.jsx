import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  atmAuthenticateCard,
  atmValidatePIN,
  atmGetBalance,
  atmWithdraw,
  atmMiniStatement,
  atmChangePIN,
} from "../../services/atmService";

const S = {
  INSERT_CARD:"INSERT_CARD", ENTER_PIN:"ENTER_PIN", MENU:"MENU",
  BALANCE:"BALANCE", WITHDRAW:"WITHDRAW", WITHDRAW_CONFIRM:"WITHDRAW_CONFIRM",
  SUCCESS:"SUCCESS", RECEIPT:"RECEIPT", CHANGE_PIN:"CHANGE_PIN",
  CHANGE_PIN_DONE:"CHANGE_PIN_DONE", ERROR:"ERROR",
};

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];
const CREDIT_TYPES  = ["CREDIT", "TRANSFER_IN"];

const ATM_STYLES = `
  @keyframes cashSlideOut {
    0%   { transform: translateY(-140px) scaleY(0.2); opacity: 0; }
    50%  { transform: translateY(8px) scaleY(1.04); opacity: 1; }
    70%  { transform: translateY(-4px) scaleY(0.98); }
    100% { transform: translateY(0px) scaleY(1); opacity: 1; }
  }
  @keyframes slotPulse {
    0%,100% { box-shadow: 0 0 4px #C9ADA7; }
    50%     { box-shadow: 0 0 22px #C9ADA7, 0 0 44px rgba(201,173,167,0.35); }
  }
  @keyframes amountBounce {
    0%   { transform: scale(0.4); opacity: 0; }
    65%  { transform: scale(1.12); opacity: 1; }
    100% { transform: scale(1); }
  }
  @keyframes fadeUp {
    0%   { transform: translateY(16px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes noteFloat {
    0%,100% { transform: translateY(0px) rotate(-1.5deg); }
    50%     { transform: translateY(-9px) rotate(1.5deg); }
  }
  @keyframes screenBlink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.55; }
  }
  @keyframes menuItemIn {
    0%   { transform: translateX(-12px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  .atm-cash-note { animation: cashSlideOut 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
  .atm-slot      { animation: slotPulse 1.6s ease-in-out; }
  .atm-amt-pop   { animation: amountBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.7s both; }
  .atm-fade-1    { animation: fadeUp 0.4s ease 0.85s both; }
  .atm-fade-2    { animation: fadeUp 0.4s ease 1.05s both; }
  .atm-fade-3    { animation: fadeUp 0.4s ease 1.25s both; }
  .note-float    { animation: noteFloat 2.2s ease-in-out 1.5s infinite; }
  .atm-blink     { animation: screenBlink 1.1s ease-in-out infinite; }
  .menu-item-0   { animation: menuItemIn 0.3s ease 0.05s both; }
  .menu-item-1   { animation: menuItemIn 0.3s ease 0.15s both; }
  .menu-item-2   { animation: menuItemIn 0.3s ease 0.25s both; }
  .menu-item-3   { animation: menuItemIn 0.3s ease 0.35s both; }
  .menu-item-4   { animation: menuItemIn 0.3s ease 0.45s both; }
  .atm-input {
    background: #977c69 !important; border: 1px solid #3d2a1e !important;
    color: #F2E9E4 !important; font-size: 24px !important; letter-spacing: 8px !important;
    text-align: center !important; font-family: 'DM Mono', monospace !important; font-weight: 700 !important;
  }
  .atm-input:focus { border-color: #8F7265 !important; box-shadow: 0 0 0 3px rgba(143,114,101,0.2) !important; }
  .atm-input::placeholder { color: #3d2a1e !important; }
  .atm-card-input {
    background: #977c69 !important; border: 1px solid #3d2a1e !important;
    color: #F2E9E4 !important; font-size: 17px !important; letter-spacing: 3px !important;
    text-align: center !important; font-family: 'DM Mono', monospace !important; font-weight: 700 !important;
  }
  .atm-card-input:focus { border-color: #8F7265 !important; box-shadow: 0 0 0 3px rgba(143,114,101,0.2) !important; }
  .atm-card-input::placeholder { color: #3d2a1e !important; }
  .atm-number-input {
    background: #977c69 !important; border: 1px solid #3d2a1e !important;
    color: #F2E9E4 !important; font-family: 'DM Mono', monospace !important;
    font-weight: 700 !important; font-size: 18px !important;
  }
  .atm-number-input:focus { border-color: #8F7265 !important; box-shadow: 0 0 0 3px rgba(143,114,101,0.2) !important; }
  .atm-quick-amt {
    background: #977c69 !important; color: #C9ADA7; border: 1px solid #3d2a1e;
    font-size: 12px; transition: all 0.15s; border-radius: 6px; padding: 6px;
  }
  .atm-quick-amt:hover { background: #2e1a0e; border-color: #8F7265; color: #F2E9E4; }
  .atm-quick-amt.selected { background: #725444; border-color: #8F7265; color: #F2E9E4; }
  .atm-menu-btn {
    background: #977c69; color: #F2E9E4; border: 1px solid #3d2a1e;
    font-size: 13px; font-weight: 600; text-align: left; transition: all 0.15s;
    padding: 10px 16px; border-radius: 8px; width: 100%; cursor: pointer;
  }
  .atm-menu-btn:hover { background: #2e1a0e; border-color: #8F7265; color: #F2E9E4; transform: translateX(3px); }
  .atm-data-box { background: #977c69; border-radius: 10px; border: 1px solid #3d2a1e; }
`;

const P = {
  screenBg:"#2e170d", inputBg:"#977c69", border:"#3d2a1e",
  text:"#F2E9E4", accent:"#C9ADA7", dim:"#8F7265", dimmer:"#5c3d2a",
  confirm:"#725444", confirmHov:"#543622", cancel:"#7a2e1e",
  back:"#4a3228", amber:"#c9913a", error:"#d45c4a",
};

export default function VirtualATM() {
  const [screen,      setScreen]      = useState(S.INSERT_CARD);
  const [loading,     setLoading]     = useState(false);
  const [errorMsg,    setErrorMsg]    = useState("");
  const [cardNumber,  setCardNumber]  = useState("");
  const [accountId,   setAccountId]   = useState(null);
  const [customerId,  setCustomerId]  = useState(null);
  const [holderName,  setHolderName]  = useState("");
  const [accountType, setAccountType] = useState("SAVINGS");
  const [pin,         setPin]         = useState("");
  const [pinVisible,  setPinVisible]  = useState(false);
  const [pinAttempts, setPinAttempts] = useState(0);
  const [liveBalance, setLiveBalance] = useState(null);
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [lastTxn,     setLastTxn]     = useState(null);
  const [miniTxns,    setMiniTxns]    = useState([]);
  const [pinStep,     setPinStep]     = useState(1);
  const [newPin1,     setNewPin1]     = useState("");
  const [newPin2,     setNewPin2]     = useState("");

  function go(scr) { setErrorMsg(""); setScreen(scr); }
  function formatCard(val) { return val.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim(); }
  function reset() {
    setScreen(S.INSERT_CARD); setLoading(false); setErrorMsg("");
    setCardNumber(""); setAccountId(null); setCustomerId(null);
    setHolderName(""); setAccountType("SAVINGS");
    setPin(""); setPinVisible(false); setPinAttempts(0);
    setLiveBalance(null); setWithdrawAmt(""); setLastTxn(null);
    setMiniTxns([]); setPinStep(1); setNewPin1(""); setNewPin2("");
  }

  async function handleInsertCard(e) {
    e.preventDefault(); setLoading(true);
    try {
      const data = await atmAuthenticateCard(cardNumber.replace(/\s/g,""));
      setAccountId(data.accountId); setCustomerId(data.customerId);
      setHolderName(data.username||"Account Holder"); setAccountType(data.accountType||"SAVINGS");
      go(S.ENTER_PIN);
    } catch { setErrorMsg("Card not recognised. Please check your account number."); setScreen(S.ERROR); }
    finally { setLoading(false); }
  }

  async function handlePin(e) {
    e.preventDefault(); setLoading(true);
    try { await atmValidatePIN(customerId,pin); setPinAttempts(0); go(S.MENU); }
    catch {
      const att=pinAttempts+1; setPinAttempts(att);
      if(att>=3){setErrorMsg("Card blocked after 3 wrong attempts. Visit your branch.");setScreen(S.ERROR);}
      else{setErrorMsg(`Wrong PIN. ${3-att} attempt(s) left.`);setPin("");}
    } finally { setLoading(false); }
  }

  async function handleCheckBalance() {
    setLoading(true);
    try { const data=await atmGetBalance(accountId); setLiveBalance(data.balance); go(S.BALANCE); }
    catch { setErrorMsg("Could not fetch balance. Try again."); setScreen(S.ERROR); }
    finally { setLoading(false); }
  }

  function handleWithdrawValidate(e) {
    e.preventDefault();
    const amt=parseFloat(withdrawAmt);
    if(!amt||amt<=0){setErrorMsg("Enter a valid amount.");return;}
    if(amt%100!==0){setErrorMsg("Amount must be in multiples of ₹100.");return;}
    if(amt>20000){setErrorMsg("Max ₹20,000 per transaction.");return;}
    if(liveBalance!==null&&amt>liveBalance){setErrorMsg("Insufficient balance.");return;}
    go(S.WITHDRAW_CONFIRM);
  }

  async function handleConfirmWithdraw() {
    setLoading(true);
    try {
      await atmWithdraw({accountId,amount:parseFloat(withdrawAmt),transactionPin:pin});
      const newBal=(liveBalance??0)-parseFloat(withdrawAmt);
      setLiveBalance(newBal);
      setLastTxn({amount:parseFloat(withdrawAmt),balanceAfter:newBal,time:new Date().toLocaleTimeString("en-IN"),refNo:"ATM"+Math.floor(Math.random()*9000000+1000000)});
      setWithdrawAmt(""); go(S.SUCCESS);
    } catch { setErrorMsg("Withdrawal failed. Check balance and try again."); setScreen(S.ERROR); }
    finally { setLoading(false); }
  }

  async function handleMiniStatement() {
    setLoading(true);
    try { const txns=await atmMiniStatement(accountId); setMiniTxns(txns); go(S.RECEIPT); }
    catch { setErrorMsg("Could not load statement."); setScreen(S.ERROR); }
    finally { setLoading(false); }
  }

  async function handleChangePIN(e) {
    e.preventDefault();
    if(pinStep===1){
      if(newPin1.length!==6){setErrorMsg("PIN must be 6 digits.");return;}
      if(newPin1===pin){setErrorMsg("New PIN cannot be same as current PIN.");return;}
      setErrorMsg(""); setPinStep(2); return;
    }
    if(newPin1!==newPin2){setErrorMsg("PINs do not match.");setNewPin2("");return;}
    setLoading(true);
    try { await atmChangePIN(customerId,pin,newPin1); setPin(newPin1); go(S.CHANGE_PIN_DONE); }
    catch { setErrorMsg("Could not change PIN. Try again."); }
    finally { setLoading(false); }
  }

  const ScreenTitle = ({icon,label,color=P.accent}) => (
    <div className="text-center mb-4">
      <div style={{width:52,height:52,borderRadius:"50%",background:"#120c08",border:`2px solid ${color}`,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>
        <i className={`bi ${icon}`} style={{fontSize:21,color}} />
      </div>
      <p className="mt-2 mb-0" style={{color,fontSize:11,letterSpacing:1.5,textTransform:"uppercase"}}>{label}</p>
    </div>
  );

  const BtnPrimary = ({children,onClick,type="button",disabled=false}) => (
    <button type={type} className="btn w-100 fw-bold mb-2" onClick={onClick} disabled={disabled}
      style={{background:`linear-gradient(135deg,${P.confirm},${P.confirmHov})`,color:"#F2E9E4",border:"none",fontSize:13,borderRadius:8,padding:"10px",letterSpacing:0.5}}>
      {children}
    </button>
  );

  const BtnSecondary = ({children,onClick,type="button"}) => (
    <button type={type} className="btn w-100 fw-bold mb-2" onClick={onClick}
      style={{background:"transparent",color:P.dim,border:`1px solid ${P.border}`,fontSize:13,borderRadius:8,padding:"10px"}}>
      {children}
    </button>
  );

  const BtnBack = ({onClick}) => (
    <button className="btn w-100 fw-bold mt-2" onClick={onClick}
      style={{background:P.back,color:P.accent,border:"none",fontSize:13,borderRadius:8,padding:"10px"}}>
      <i className="bi bi-arrow-left me-2"/>BACK TO MENU
    </button>
  );

  return (
    <div className="p-4">
      <style>{ATM_STYLES}</style>
      <h2 className="fw-bold mb-4" style={{color:"#543622"}}>Virtual ATM</h2>
      <div className="d-flex justify-content-center">
        <div style={{width:"100%",maxWidth:420}}>

          {/* ATM SHELL */}
          <div className="rounded-4 shadow-lg overflow-hidden"
            style={{background:"linear-gradient(160deg,#2e1608,#543622)",border:"6px solid #725444",boxShadow:"0 20px 60px rgba(84,54,34,0.5),0 0 0 1px #3d2010"}}>

            {/* Header */}
            <div className="text-center py-3" style={{background:"linear-gradient(135deg,#3d1e0a 0%,#725444 100%)",borderBottom:"2px solid #543622"}}>
              <p className="fw-bold mb-0" style={{fontSize:15,letterSpacing:2.5,color:"#F2E9E4"}}>
                <i className="bi bi-bank2 me-2" style={{color:"#C9ADA7"}}/>DDBP BANK ATM
              </p>
              <p className="mb-0" style={{fontSize:9,color:"rgba(201,173,167,0.6)",letterSpacing:2.5}}>AVAILABLE 24 × 7</p>
            </div>

            {/* Sub bar */}
            <div className="d-flex justify-content-between px-4 py-2" style={{background:"#1a0a04",borderBottom:"1px solid #2e1608"}}>
              <span style={{color:"#5c3d2a",fontSize:10,letterSpacing:1}}>DDBP BANK · SECURE ATM</span>
              <span style={{color:"#5c3d2a",fontSize:10}}>{new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>
            </div>

            {/* SCREEN */}
            <div className="mx-4 mt-4 mb-2 rounded-3 p-4" style={{background:P.screenBg,border:"3px solid #2e1608",minHeight:320,position:"relative"}}>

              {/* corner screws */}
              {["top-0 start-0","top-0 end-0","bottom-0 start-0","bottom-0 end-0"].map((pos,i)=>(
                <div key={i} className={`position-absolute ${pos} m-2`} style={{width:6,height:6,borderRadius:"50%",background:"#2e1608",border:"1px solid #3d2a1e"}}/>
              ))}

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border mb-3" style={{color:P.accent,width:38,height:38,borderWidth:3}}/>
                  <p className="atm-blink" style={{color:P.accent,fontSize:11,letterSpacing:2}}>PROCESSING...</p>
                </div>
              )}

              {!loading && <>

                {/* INSERT CARD */}
                {screen===S.INSERT_CARD&&(
                  <div>
                    <ScreenTitle icon="bi-credit-card-2-front" label="Insert Your Card"/>
                    <form onSubmit={handleInsertCard}>
                      <label style={{color:P.dim,fontSize:10,letterSpacing:1}}>CARD / ACCOUNT NUMBER (16 DIGITS)</label>
                      <input className="form-control atm-card-input mt-1 mb-3"
                        type="text" placeholder="XXXX XXXX XXXX XXXX"
                        value={formatCard(cardNumber)}
                        onChange={(e)=>setCardNumber(e.target.value.replace(/\s/g,""))}
                        maxLength={19} autoFocus/>
                      <BtnPrimary type="submit" disabled={cardNumber.replace(/\s/g,"").length!==16}>
                        <i className="bi bi-arrow-right-circle me-2"/>INSERT CARD
                      </BtnPrimary>
                    </form>
                    <p className="text-center mt-2" style={{color:P.dimmer,fontSize:10}}>Card number maps to your registered account number</p>
                  </div>
                )}

                {/* ENTER PIN */}
                {screen===S.ENTER_PIN&&(
                  <div>
                    <ScreenTitle icon="bi-shield-lock" label="Enter Your PIN"/>
                    <p className="text-center mb-3" style={{color:P.dimmer,fontSize:11}}>Card: **** **** **** {cardNumber.slice(-4)}</p>
                    <form onSubmit={handlePin}>
                      <div className="position-relative mb-3">
                        <input className="form-control atm-input"
                          type={pinVisible?"text":"password"} placeholder="••••••" value={pin}
                          onChange={(e)=>{setPin(e.target.value.replace(/\D/g,"").slice(0,6));setErrorMsg("");}}
                          maxLength={6} autoFocus/>
                        <button type="button" className="btn btn-sm position-absolute end-0 top-50 translate-middle-y me-2"
                          style={{color:P.dim,background:"none",border:"none"}}
                          onClick={()=>setPinVisible(!pinVisible)}>
                          <i className={`bi ${pinVisible?"bi-eye-slash":"bi-eye"}`}/>
                        </button>
                      </div>
                      {errorMsg&&<p className="text-center mb-2" style={{color:P.error,fontSize:12}}>{errorMsg}</p>}
                      <BtnPrimary type="submit" disabled={pin.length!==6}><i className="bi bi-check-circle me-2"/>CONFIRM PIN</BtnPrimary>
                      <BtnSecondary onClick={reset}>CANCEL / EJECT CARD</BtnSecondary>
                    </form>
                    <p className="text-center mt-1" style={{color:P.dimmer,fontSize:10}}>PIN is separate from your login password</p>
                  </div>
                )}

                {/* MENU */}
                {screen===S.MENU&&(
                  <div>
                    <div className="text-center mb-3">
                      <div style={{display:"inline-block",padding:"3px 14px",borderRadius:20,background:"rgba(114,84,68,0.2)",border:"1px solid #5c3d2a"}}>
                        <span style={{color:P.accent,fontSize:10,letterSpacing:1.5}}>✓ AUTHENTICATED</span>
                      </div>
                    </div>
                    <p className="text-center fw-bold mb-4" style={{color:P.text,fontSize:15,textTransform:"uppercase",letterSpacing:1}}>{holderName}</p>
                    <div className="d-flex flex-column gap-2">
                      {[
                        {label:"Check Balance", icon:"bi-eye",        color:P.accent,   action:handleCheckBalance,                                                     cls:"menu-item-0"},
                        {label:"Withdraw Cash", icon:"bi-cash-stack", color:"#b5916a",  action:()=>{setWithdrawAmt("");go(S.WITHDRAW);},                               cls:"menu-item-1"},
                        {label:"Mini Statement",icon:"bi-receipt",    color:"#9b7d9e",  action:handleMiniStatement,                                                    cls:"menu-item-2"},
                        {label:"Change PIN",    icon:"bi-key",        color:P.amber,    action:()=>{setPinStep(1);setNewPin1("");setNewPin2("");go(S.CHANGE_PIN);},     cls:"menu-item-3"},
                      ].map((item)=>(
                        <button key={item.label} className={`atm-menu-btn ${item.cls}`} onClick={item.action}>
                          <i className={`bi ${item.icon} me-3`} style={{color:item.color,fontSize:15}}/>{item.label}
                        </button>
                      ))}
                      <button className="atm-menu-btn menu-item-4 mt-1" style={{color:P.error,borderColor:"#4a1e14"}} onClick={reset}>
                        <i className="bi bi-eject me-3" style={{color:P.error}}/>EJECT CARD
                      </button>
                    </div>
                  </div>
                )}

                {/* BALANCE */}
                {screen===S.BALANCE&&(
                  <div className="text-center">
                    <ScreenTitle icon="bi-eye" label="Balance Inquiry" color={P.accent}/>
                    <p style={{color:P.dim,fontSize:11}}>{accountType} · **** {cardNumber.slice(-4)}</p>
                    <div className="py-4 my-3 atm-data-box">
                      <p style={{color:P.dimmer,fontSize:10,letterSpacing:1.5,textTransform:"uppercase"}}>Available Balance</p>
                      <p className="fw-bold font-mono mb-0" style={{fontSize:34,color:P.text,letterSpacing:1}}>{formatCurrency(liveBalance)}</p>
                    </div>
                    <p style={{color:P.dimmer,fontSize:10}}>As of {new Date().toLocaleString("en-IN")}</p>
                    <BtnBack onClick={()=>go(S.MENU)}/>
                  </div>
                )}

                {/* WITHDRAW */}
                {screen===S.WITHDRAW&&(
                  <div>
                    <ScreenTitle icon="bi-cash-stack" label="Cash Withdrawal" color="#b5916a"/>
                    <div className="row g-2 mb-3">
                      {QUICK_AMOUNTS.map((amt)=>(
                        <div key={amt} className="col-4">
                          <button className={`btn btn-sm w-100 atm-quick-amt ${withdrawAmt==amt?"selected":""}`}
                            onClick={()=>{setWithdrawAmt(String(amt));setErrorMsg("");}}>
                            ₹{amt.toLocaleString("en-IN")}
                          </button>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleWithdrawValidate}>
                      <div className="input-group mb-2">
                        <span className="input-group-text" style={{background:P.inputBg,color:P.dim,border:`1px solid ${P.border}`}}>₹</span>
                        <input className="form-control atm-number-input text-center"
                          type="number" placeholder="Other amount" value={withdrawAmt}
                          onChange={(e)=>{setWithdrawAmt(e.target.value);setErrorMsg("");}}
                          min="100" step="100"/>
                      </div>
                      {errorMsg&&<p className="text-center mb-1" style={{color:P.error,fontSize:12}}>{errorMsg}</p>}
                      <p className="text-center mb-3" style={{color:P.dimmer,fontSize:10}}>
                        Multiples of ₹100 · Max ₹20,000{liveBalance!==null&&` · Bal: ${formatCurrency(liveBalance)}`}
                      </p>
                      <BtnPrimary type="submit"><i className="bi bi-check-circle me-2"/>PROCEED</BtnPrimary>
                      <BtnSecondary onClick={()=>{setWithdrawAmt("");go(S.MENU);}}>CANCEL</BtnSecondary>
                    </form>
                  </div>
                )}

                {/* CONFIRM WITHDRAW */}
                {screen===S.WITHDRAW_CONFIRM&&(
                  <div className="text-center">
                    <ScreenTitle icon="bi-exclamation-triangle" label="Confirm Withdrawal" color={P.amber}/>
                    <div className="py-3 mb-3 atm-data-box">
                      <p style={{color:P.dimmer,fontSize:10,letterSpacing:1.5,textTransform:"uppercase"}}>Amount to Withdraw</p>
                      <p className="fw-bold font-mono mb-0" style={{fontSize:32,color:P.text}}>{formatCurrency(parseFloat(withdrawAmt))}</p>
                    </div>
                    {liveBalance!==null&&(
                      <p style={{color:P.dim,fontSize:12}} className="mb-1">
                        Balance after: <span style={{color:P.accent,fontWeight:600}}>{formatCurrency(liveBalance-parseFloat(withdrawAmt))}</span>
                      </p>
                    )}
                    <p style={{color:P.dimmer,fontSize:10}} className="mb-3">Recorded as ATM_WITHDRAWAL transaction</p>
                    <div className="d-flex gap-2">
                      <button className="btn flex-fill fw-bold"
                        style={{background:`linear-gradient(135deg,${P.confirm},${P.confirmHov})`,color:"#F2E9E4",border:"none",borderRadius:8}}
                        onClick={handleConfirmWithdraw}>
                        <i className="bi bi-check-lg me-2"/>CONFIRM
                      </button>
                      <button className="btn flex-fill fw-bold"
                        style={{background:P.cancel,color:"#F2E9E4",border:"none",borderRadius:8}}
                        onClick={()=>go(S.WITHDRAW)}>
                        <i className="bi bi-x-lg me-2"/>CANCEL
                      </button>
                    </div>
                  </div>
                )}

                {/* SUCCESS */}
                {screen===S.SUCCESS&&lastTxn&&(
                  <div className="text-center">
                    <div className="atm-slot mx-auto mb-1" style={{width:130,height:12,background:"#0a0604",borderRadius:6,border:`2px solid ${P.accent}`}}/>
                    <div className="atm-cash-note mx-auto mb-3" style={{width:170}}>
                      <div style={{background:"linear-gradient(135deg,#543622 0%,#8F7265 50%,#543622 100%)",borderRadius:10,padding:"16px 20px",border:"2px solid #C9ADA7",boxShadow:"0 10px 30px rgba(201,173,167,0.3)",position:"relative",overflow:"hidden"}}>
                        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 7px,rgba(255,255,255,0.04) 7px,rgba(255,255,255,0.04) 14px)"}}/>
                        <p className="note-float fw-bold font-mono mb-1" style={{fontSize:20,color:"#F2E9E4",letterSpacing:1,position:"relative"}}>{formatCurrency(lastTxn.amount)}</p>
                        <p className="mb-0" style={{fontSize:8,color:"rgba(242,233,228,0.5)",letterSpacing:3,position:"relative"}}>DDBP BANK · INDIA · RBI</p>
                      </div>
                    </div>
                    <p className="fw-bold atm-fade-1" style={{color:P.accent,fontSize:12,letterSpacing:1.5}}>✓ PLEASE COLLECT YOUR CASH</p>
                    <div className="py-3 mb-2 atm-amt-pop atm-data-box">
                      <p style={{color:P.dimmer,fontSize:10,letterSpacing:1.5,textTransform:"uppercase"}}>Amount Dispensed</p>
                      <p className="fw-bold font-mono mb-0" style={{fontSize:28,color:P.text}}>{formatCurrency(lastTxn.amount)}</p>
                    </div>
                    <p className="atm-fade-2" style={{color:P.dim,fontSize:12}}>Remaining: <span style={{color:P.accent,fontWeight:600}}>{formatCurrency(lastTxn.balanceAfter)}</span></p>
                    <p className="font-mono atm-fade-2" style={{color:P.dimmer,fontSize:10}}>Ref: {lastTxn.refNo} · {lastTxn.time}</p>
                    <div className="d-flex gap-2 mt-3 atm-fade-3">
                      <button className="btn flex-fill" style={{background:P.back,color:P.accent,border:"none",fontSize:12,borderRadius:8}} onClick={()=>go(S.MENU)}>
                        <i className="bi bi-grid me-1"/>MENU
                      </button>
                      <button className="btn flex-fill" style={{background:`linear-gradient(135deg,${P.confirm},${P.confirmHov})`,color:"#F2E9E4",border:"none",fontSize:12,borderRadius:8}} onClick={reset}>
                        <i className="bi bi-eject me-1"/>EJECT CARD
                      </button>
                    </div>
                  </div>
                )}

                {/* MINI STATEMENT */}
                {screen===S.RECEIPT&&(
                  <div>
                    <ScreenTitle icon="bi-receipt" label="Mini Statement" color="#9b7d9e"/>
                    <div className="atm-data-box" style={{padding:"12px 14px",maxHeight:210,overflowY:"auto"}}>
                      <p className="font-mono mb-2" style={{color:P.accent,fontSize:10}}>Acct: **** **** **** {cardNumber.slice(-4)} · {accountType}</p>
                      <hr style={{borderColor:P.border,margin:"6px 0"}}/>
                      {miniTxns.length===0?(
                        <p className="text-center" style={{color:P.dimmer,fontSize:12}}>No recent transactions.</p>
                      ):miniTxns.map((t,i)=>{
                        const isCredit=CREDIT_TYPES.includes(t.transactionType);
                        return(
                          <div key={t.transactionId||i} className="d-flex justify-content-between align-items-center py-1" style={{fontSize:11,borderBottom:"1px solid #1f1008"}}>
                            <span style={{color:P.text,maxWidth:"58%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.description||t.transactionType}</span>
                            <span className="font-mono fw-semibold" style={{color:isCredit?P.accent:P.error}}>{isCredit?"+":"−"}{formatCurrency(t.amount)}</span>
                          </div>
                        );
                      })}
                      {liveBalance!==null&&<>
                        <hr style={{borderColor:P.border,margin:"6px 0"}}/>
                        <div className="d-flex justify-content-between">
                          <span style={{color:P.dim,fontSize:11}}>Current Balance</span>
                          <span className="font-mono fw-bold" style={{color:P.accent,fontSize:12}}>{formatCurrency(liveBalance)}</span>
                        </div>
                      </>}
                    </div>
                    <BtnBack onClick={()=>go(S.MENU)}/>
                  </div>
                )}

                {/* CHANGE PIN */}
                {screen===S.CHANGE_PIN&&(
                  <div>
                    <ScreenTitle icon="bi-key" label={`Change PIN — Step ${pinStep} of 2`} color={P.amber}/>
                    <p className="text-center mb-3" style={{color:P.dim,fontSize:12}}>{pinStep===1?"Enter your NEW 6-digit PIN":"Re-enter new PIN to confirm"}</p>
                    <form onSubmit={handleChangePIN}>
                      <input className="form-control atm-input mb-3"
                        type="password" placeholder="••••••"
                        value={pinStep===1?newPin1:newPin2}
                        onChange={(e)=>{const v=e.target.value.replace(/\D/g,"").slice(0,6);pinStep===1?setNewPin1(v):setNewPin2(v);setErrorMsg("");}}
                        maxLength={6} autoFocus/>
                      {errorMsg&&<p className="text-center mb-2" style={{color:P.error,fontSize:12}}>{errorMsg}</p>}
                      <BtnPrimary type="submit" disabled={(pinStep===1?newPin1:newPin2).length!==6}>
                        <i className="bi bi-arrow-right-circle me-2"/>{pinStep===1?"NEXT":"SET NEW PIN"}
                      </BtnPrimary>
                      <BtnSecondary onClick={()=>{setPinStep(1);setNewPin1("");setNewPin2("");go(S.MENU);}}>CANCEL</BtnSecondary>
                    </form>
                  </div>
                )}

                {/* CHANGE PIN DONE */}
                {screen===S.CHANGE_PIN_DONE&&(
                  <div className="text-center">
                    <div style={{fontSize:50}} className="mb-3">🔐</div>
                    <p className="fw-bold mb-2" style={{color:P.accent,fontSize:13,letterSpacing:1}}>PIN CHANGED SUCCESSFULLY</p>
                    <p style={{color:P.dim,fontSize:12}} className="mb-4">Your new PIN is active immediately.</p>
                    <BtnPrimary onClick={()=>go(S.MENU)}><i className="bi bi-grid me-2"/>BACK TO MENU</BtnPrimary>
                  </div>
                )}

                {/* ERROR */}
                {screen===S.ERROR&&(
                  <div className="text-center">
                    <div style={{fontSize:48}} className="mb-3">🚫</div>
                    <p className="fw-bold mb-3" style={{color:P.error,fontSize:13,letterSpacing:1}}>TRANSACTION FAILED</p>
                    <div className="p-3 mb-4 atm-data-box" style={{border:`1px solid ${P.cancel}`}}>
                      <p className="mb-0" style={{color:P.error,fontSize:13}}>{errorMsg}</p>
                    </div>
                    <BtnPrimary onClick={reset}><i className="bi bi-arrow-counterclockwise me-2"/>TRY AGAIN</BtnPrimary>
                  </div>
                )}

              </>}
            </div>

            {/* Cash tray */}
            <div className="mx-4 mb-3" style={{height:8,background:"#0f0704",borderRadius:4,border:"1px solid #2e1608"}}/>

            {/* Footer */}
            <div className="text-center pb-3 px-4">
              <p className="mb-0" style={{color:"#24160e",fontSize:10,letterSpacing:1}}>
                <i className="bi bi-shield-check me-1" style={{color:"#28180e"}}/>SECURED · 24/7 HELPLINE: 1800-XXX-XXXX
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
