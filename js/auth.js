// Supabase Configuration

const supabaseUrl = "https://fgqrihtdewhzyrkriqao.supabase.co";

const supabaseKey = "sb_publishable_gDl2wKrEIkOUBl-e41wKPQ_xZcqV07J";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase Connected");

// Signup Function
async function signup(event) {

    alert("Signup function called");

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    const { data, error } =
        await supabaseClient.auth.signUp({
            email,
            password
        });

    console.log("Data:", data);
    console.log("Error:", error);

    if(error){
        alert("Error: " + error.message);
    }
    else{
        alert("Account Created Successfully!");
    }
}

// Login Function
async function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if(error){
        alert(error.message);
    }
    else{
        alert("Login Successful!");
        localStorage.setItem("userEmail", email);
        window.location.href = "profile.html";
    }
}
//profile
async function saveProfile(event) {
    event.preventDefault();

    console.log("saveProfile working");

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let goal = document.getElementById("goal").value;

    let heightInM = height / 100;
    let bmi = (weight / (heightInM * heightInM)).toFixed(2);

    const { data, error } = await supabaseClient
    .from("profiles")
    .insert([
        {
            name,
            age,
            gender,
            height,
            weight,
            goal,
            bmi,
            email: localStorage.getItem("userEmail")
        }
    ]);

    if (error) {
        console.log(error);
        alert("Error saving profile ❌");
        return;
    }

    alert("Profile Saved Successfully ✅");
    window.location.href = "dashboard.html";
}