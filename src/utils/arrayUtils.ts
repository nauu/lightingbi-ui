/**
 * 数组相关工具
 * @author SPY
 * @description -- 对于数组排序、数组转换等的操作函数
 * @date -- 2019/10/23
 */

const arrayUtils = {

    arrayMoveMutate: (array: any[], from: number, to: number) => {
        array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    },

    /**
     * arrayMove:数组位置交换
     * const input = ['a', 'b', 'c'];
     * arrayMove(input, 1, 2);
     * //=> ['a', 'c', 'b']
     * 
     * arrayMove(input, -1, 0);
     * //=> ['c', 'a', 'b']
     * 
     * arrayMove(input, -2, -3);
     * //=> ['b', 'a', 'c']
     */
    arrayMove: (array: any[], from: number, to: number) => {
        array = array.slice();
        arrayUtils.arrayMoveMutate(array, from, to);
        return array;
    },

    // 根据list数据列表中某一个字段值大小排序
    sortCallBack: (sortField:string, orderBy: string = 'asc') => {
        if (orderBy === 'asc') {
            // 默认正序
            return (a:any, b: any) => a[sortField] - b[sortField];
        }
        if (orderBy === 'desc') {
            // 倒序
            return (a:any, b: any) => b[sortField] - a[sortField];
        }
        return ;

    },


    // 将一维数组或者对象的value值组成字符串，默认以‘,’隔开
    getStringValue: (obj: any, mark = ',') => Object.keys(obj).map(key => obj[key]).join(mark)


}

export default arrayUtils;