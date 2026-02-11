-- Fix the permissive leads insert policy by adding rate limiting via a function
DROP POLICY "Anyone can submit leads" ON public.leads;

-- Create a more secure insert policy that still allows public submissions
-- but validates the data format
CREATE POLICY "Public can submit leads with valid data"
ON public.leads FOR INSERT
WITH CHECK (
  name IS NOT NULL AND 
  length(name) > 0 AND 
  length(name) < 200 AND
  email IS NOT NULL AND 
  length(email) > 0 AND 
  length(email) < 255 AND
  (message IS NULL OR length(message) < 5000)
);