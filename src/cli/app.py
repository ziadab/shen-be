from requests import post
from getpass import getpass
from schema import validator
from os import system

endpoint = "https://shen-be.herokuapp.com/"

while True:
    system("cls||clear")

    data = post(f"{endpoint}generate")
    token = data.json()["data"]

    email = input(f"Enter your email:")
    pwd = getpass(f"Enter your password: ")

    is_valid = validator.validate({"email": email, "password": pwd})
    if is_valid:
        data = post(f"{endpoint}register", json={"email": email,
                                                 "pwd": pwd}, headers={"X-Shen": token})
        data = data.json()
        keys = data.keys()
        if "token" in keys:
            print("Admin got registered successfully 🥳🥳")

    else:
        keys = validator.errors.keys()
        for key in keys:
            for error in validator.errors[key]:
                print(f'{key}: {error}')

    answer = input("Do you want to add an other admin 🤔? [yes/no]: ")
    if answer.lower().strip() == "yes":
        pass
    else:
        break
