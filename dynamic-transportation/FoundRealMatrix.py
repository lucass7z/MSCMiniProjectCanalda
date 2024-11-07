from operator import contains, le
import pandas as pd
import road

def transitive_closure(matrix):
    length = len(matrix)
    for k in range(length):
        for i in range(length):
            value = matrix[k][i]
            if(value != None):
                for j in range(length):
                    if matrix[i][j] == None:
                        if matrix[k][j] != None:
                            matrix[i][j] = road.Road(duration=matrix[k][j].duration + value.duration, locomotion_type=value.locomotion_type)
                        else:
                            matrix[i][j] = None
                    else:
                        if matrix[k][j] != None:
                            if matrix[i][j].duration > matrix[k][j].duration + value.duration:
                                matrix[i][j] = road.Road(duration=matrix[k][j].duration + value.duration, locomotion_type=value.locomotion_type)
    for k in range(length):
        for i in range(length):
            if i == k:
                matrix[k][i] = None
    return matrix
def main():
    try:
        matrixExcel = pd.read_excel('dynamic-transportation/MatriceAdjacente.xlsx')
        matrixExcel.set_index('Location', inplace=True)
        return matrixExcel
    except:
        matrixExcel = pd.read_excel('MatriceAdj.xlsx')
        nb_locations = matrixExcel.shape[0]
        matrix = [[None for _ in range(nb_locations)] for _ in range(nb_locations)]
        
        for i in range(matrixExcel.shape[0]):
            for j in range(1, matrixExcel.shape[1]):
                value = matrixExcel.iat[i, j]
                if not pd.isna(value):
                    try:
                        duration, locomotion_type = value.split('/')
                        matrix[i][j-1] = road.Road(duration=int(duration), locomotion_type=locomotion_type)
                        matrixExcel.iat[i, j] = road.Road(duration=int(duration), locomotion_type=locomotion_type)
                    except Exception as e:
                        print(f"Error converting value at ({i}, {j}): {value}")
                        print(e)
                else:
                    matrix[i][j-1] = None
        
        # Apply transitive closure
        road_matrix = transitive_closure(matrix)
        road_matrix = pd.DataFrame(road_matrix)
        
        #add the first column of matrixExcel to the road_matrix
        road_matrix.insert(0, 'Location', matrixExcel.iloc[:,0])
        #Set the header names
        road_matrix.columns = matrixExcel.columns

        #Replace the first name Column
        road_matrix.columns.values[0] = 'Location'

        #Set firstColumn as the index
        road_matrix.set_index('Location', inplace=True)
        
        #Save the road_matrix to an excel file
        road_matrix.to_excel('dynamic-transportation/MatriceAdjacente.xlsx', index=True)
        return road_matrix
    

if __name__ == '__main__':
    main()