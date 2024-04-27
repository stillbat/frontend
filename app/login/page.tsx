"use client";
import React, { ChangeEventHandler, useState } from "react";
import { useRouter } from 'next/navigation'
import { link } from "fs";








export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => { setEmail(e.target.value) };
    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => { setPassword(e.target.value) };

    const handleLogin = async () => {
        try {
            const res = await fetch("https://backend-gej8.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            if(res.status == 200) {
                const data = await res.json();
                localStorage.setItem("token", data)
                router.push("/");
            } else if (res.status == 401) {
            throw new Error("Unouthorized");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "32px 32px 32px 32px",
                backgroundColor: "rgba(235, 235, 235, 1)",
                width: "280px",
                height: "350px",
                borderRadius: "16px"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "left",
                    padding: "32px 32px 32px 32px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    gap: "20px"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <label style={{ opacity: "50%", fontSize: "10px" }}>Email</label>
                        <input type="email" placeholder="" onChange={handleEmailChange}
                            style={{
                                padding: "15px",
                                margin: "10px, 0px",
                                borderRadius: "2px",
                                border: "1px solid rgba(102, 102, 102, 0.35)",
                                width: "180px"
                            }}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <label style={{ opacity: "50%", fontSize: "10px" }}>Password</label>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <input type="password" placeholder="" onChange={handlePasswordChange}
                                style={{
                                    padding: "15px",
                                    margin: "10px, 0px",
                                    borderRadius: "2px",
                                    border: "1px solid rgba(102, 102, 102, 0.35)",
                                    width: "180px",
                                }}
                            />
                            {/* <div style={{ display: "flex,", position: "absolute", right: "1180px" }}>
                                <img src="./eye-open3.png" width={25} height={25} />
                                <img src="./eye-close3.png" width={25} height={25} />
                            </div> */}
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <button onClick={handleLogin}
                            style={{
                                width: "100%",
                                padding: "15px",
                                margin: "10px, 0px",
                                borderRadius: "2px",
                                border: "1px solid rgba(102, 102, 102, 0.35)"
                            }}
                        >Login</button>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <a href="/register">register</a>
                    </div>
                </div>
            </div >
        </div>
    );
};
