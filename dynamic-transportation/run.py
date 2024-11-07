import FoundRealMatrix
import pandas as pd

def split_matrix(matrix):
    matrix = pd.DataFrame(matrix)
    #Replace nan by None
    matrix = matrix.where(pd.notnull(matrix), None)
    # Créer des DataFrames vides pour le temps et la méthode
    time_df = pd.DataFrame(index=matrix.index, columns=matrix.columns)
    method_df = pd.DataFrame(index=matrix.index, columns=matrix.columns)
    
    # Parcourir chaque cellule de la matrice d'origine
    for i in matrix.index:
        for j in matrix.columns:
            value = matrix.at[i, j]
            if value != None:
                if '/' in value:
                    time, method = value.split('/')
                    time_df.at[i, j] = int(time)
                    method_df.at[i, j] = method
                else:
                    time_df.at[i, j] = value
                    method_df.at[i, j] = None
    
    return time_df, method_df

def chooseLocations(nbUser: int, matrix) -> None:
    x = 1
    print("Locations:")
    for i in matrix:
        print(f"{x} : {i}")
        x += 1
    locations = []
    for i in range(nbUser):
        b = False
        while not b:
            try:
                loc = int(input(f"Enter the location of user {i+1}: "))
                if loc <= 0 or loc > len(matrix):
                    raise ValueError
                locations.append(loc)
                b= True
            except ValueError:
                print(f"Please enter a valid location between 1 and {len(matrix)}")
    return locations   

def findRDV(locations, matrix):
    matrix, type_matrix = split_matrix(matrix)
    # Convertir les indices des locations en noms
    locations_names = [matrix.index[loc - 1] for loc in locations]
    
    # Extraire les distances pour les locations sélectionnées
    selected_distances = matrix.loc[locations_names, :]
    
    # Calculer la somme des distances pour chaque location dans la matrice complète
    sum_distances = selected_distances.sum(axis=0)
    
    # Trouver la location avec la somme des distances la plus faible
    best_location = sum_distances.idxmin()
    
    print(f"The best location for the meeting is: {best_location}")
    
    user = 1
    maxTime = [0]
    # Afficher le temps pour chaque location d'atteindre la meilleure location avec le type de transport
    for loc_name in locations_names:
        time_to_best_location = matrix.at[loc_name, best_location]
        if loc_name == best_location:
            print(f"User {user} will not move.")
        else:
            maxTime.append(time_to_best_location)
            print(f"User {user} takes {time_to_best_location} minutes from {loc_name} to reach {best_location} by {type_matrix.at[loc_name, best_location]}")
        user += 1
    print(f"Normally in {max(maxTime)} minutes, all users will be at the meeting point.")
def main() -> None:
    try:
        nbUser = int(input("Enter the number of users: "))
        if nbUser <= 1:
            raise ValueError
        matrix = FoundRealMatrix.main()
        locations = chooseLocations(nbUser, matrix)
        foundRDV = findRDV(locations, matrix)
    except ValueError:
        print("Please enter a valid number superior to 1")
        main()
    
if __name__ == '__main__':
    main()