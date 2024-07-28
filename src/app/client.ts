import { createClient } from "@supabase/supabase-js";

const URL = "https://xxdevkarigwsngziphkt.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZGV2a2FyaWd3c25nemlwaGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxNjMzNjEsImV4cCI6MjAzNDczOTM2MX0.0IxENTtAU3RJP7IorRYD1911Yd0CzPMsPWtUkkFqjS0";

export const supabase = createClient(URL, API_KEY);