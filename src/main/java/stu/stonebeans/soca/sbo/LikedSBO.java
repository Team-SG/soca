package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.LikedVO;
import java.util.HashMap;
import java.util.List;

public interface LikedSBO {
    List<LikedVO> findLiked(String email);

    void deleteLiked(HashMap<String, String> map);

    void insertLiked(HashMap<String, String> map);
}
