import Redis from "ioredis";

export const redis = new Redis({
  port: 10313, // Redis port
  host: "redis-10313.c9.us-east-1-4.ec2.cloud.redislabs.com", // Redis host
  password: "Gsmn1sGIVOlh16yrPtqUntF7FW0YJuqX",
});
