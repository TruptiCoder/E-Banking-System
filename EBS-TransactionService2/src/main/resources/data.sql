INSERT INTO transactions (
    account_id, 
    transaction_type, 
    amount, 
    description, 
    reference_number, 
    balance_after, 
    created_at
) VALUES (
    102,                           -- account_id
    'CREDIT',                       -- transaction_type
    15000.50,                       -- amount
    'ATM Withdrawal at Main St',   -- description
    'REF-' || gen_random_uuid(),   -- reference_number (generates a unique string)
    85000.00,                       -- balance_after
    CURRENT_TIMESTAMP              -- created_at
);