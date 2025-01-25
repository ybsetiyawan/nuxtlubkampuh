PGDMP  	        	             }            db    16.3    16.3 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    74880    db    DATABASE     }   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db;
                postgres    false            �            1259    74938 
   c_material    TABLE     b  CREATE TABLE public.c_material (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_material;
       public         heap    postgres    false            �            1259    74881    c_role    TABLE     ^  CREATE TABLE public.c_role (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_role;
       public         heap    postgres    false            �            1259    74886    c_user    TABLE     �  CREATE TABLE public.c_user (
    id character varying(36) NOT NULL,
    nama character varying(50),
    username character varying(50),
    password character varying(250),
    id_role character varying(36),
    aktif boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    id_customer character varying(36)
);
    DROP TABLE public.c_user;
       public         heap    postgres    false            �            1259    74894 
   m_customer    TABLE     �  CREATE TABLE public.m_customer (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    no_telp character varying(250),
    alamat text,
    email character varying(50),
    npwp character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_customer;
       public         heap    postgres    false            �            1259    74901 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_employe;
       public         heap    postgres    false            �            1259    74906    menu    TABLE     �  CREATE TABLE public.menu (
    id character varying DEFAULT 'uuid_g'::character varying NOT NULL,
    nama_menu character varying,
    link_menu character varying,
    keterangan character varying,
    class_icon character varying,
    status character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp with time zone,
    is_permission boolean,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu;
       public         heap    postgres    false            �            1259    74914 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
    id character varying NOT NULL,
    id_menu character varying NOT NULL,
    posisi character varying(1),
    level integer,
    urutan integer,
    status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    parent character varying,
    id_role character varying,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu_user;
       public         heap    postgres    false            �            1259    74957 
   t_delivery    TABLE       CREATE TABLE public.t_delivery (
    id character varying(36) NOT NULL,
    doc_no character varying(7) NOT NULL,
    tanggal_kirim timestamp without time zone DEFAULT now(),
    id_customer character varying(50) NOT NULL,
    keterangan character varying(50),
    is_status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.t_delivery;
       public         heap    postgres    false            �            1259    74966    t_delivery_detail    TABLE     �  CREATE TABLE public.t_delivery_detail (
    id character varying(36) NOT NULL,
    id_delivery character varying(36) NOT NULL,
    id_material character varying(50) NOT NULL,
    qty integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    CONSTRAINT t_delivery_detail_qty_check CHECK ((qty > 0))
);
 %   DROP TABLE public.t_delivery_detail;
       public         heap    postgres    false            �          0    74938 
   c_material 
   TABLE DATA           p   COPY public.c_material (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    221   �1       �          0    74881    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   B3       �          0    74886    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    216   b4       �          0    74894 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   �7       �          0    74901 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �:       �          0    74906    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   ;       �          0    74914 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   Y?       �          0    74957 
   t_delivery 
   TABLE DATA           �   COPY public.t_delivery (id, doc_no, tanggal_kirim, id_customer, keterangan, is_status, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    222   'C       �          0    74966    t_delivery_detail 
   TABLE DATA           �   COPY public.t_delivery_detail (id, id_delivery, id_material, qty, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    223   F       \           2606    74944    c_material c_material_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.c_material
    ADD CONSTRAINT c_material_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.c_material DROP CONSTRAINT c_material_pkey;
       public            postgres    false    221            P           2606    74922    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            R           2606    74924    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            T           2606    74926    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            V           2606    74928    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            X           2606    74930    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            Z           2606    74932    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            `           2606    74973 (   t_delivery_detail t_delivery_detail_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_pkey;
       public            postgres    false    223            ^           2606    74965    t_delivery t_delivery_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.t_delivery
    ADD CONSTRAINT t_delivery_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.t_delivery DROP CONSTRAINT t_delivery_pkey;
       public            postgres    false    222            a           2606    74933    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    4688    216            b           2606    74974 4   t_delivery_detail t_delivery_detail_id_delivery_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_id_delivery_fkey FOREIGN KEY (id_delivery) REFERENCES public.t_delivery(id);
 ^   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_id_delivery_fkey;
       public          postgres    false    223    4702    222            c           2606    74979 4   t_delivery_detail t_delivery_detail_id_material_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_id_material_fkey FOREIGN KEY (id_material) REFERENCES public.c_material(id);
 ^   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_id_material_fkey;
       public          postgres    false    223    221    4700            �   �  x���M��0���)|9��R�;c�Ӌ!0Y�N���r ��	Ҳ��WOo/�ŽXhT8l5��M,�Q��+ w/�yx|����y^�Ƿ�#� ʀq�<�4bT%ꚿ�	5d7w[aG�Z�@���&�1eMֹ;ZA
�8A�A�,��d�{��v��� �XHPK�í
�/�[�V7�m;񱻿��~2�_���/N�L���oƥ��@�i��<om����$'�Sw_n��9a���(����yL(�x�x/R*W���ᣆl��xhNI7:����r<[�D8���\�|_���FV*ɹ���V�˶=�V���z���r{]^������噂'�1�\��_
S���y��r�����a���B�����??�L'HgI�\x1��8 xC'�#&�׾�W�>�}�����      �     x���=j1���s���I�l�ݒ,$���?]��=>A�O<H��������f�;l�
�T�da������{; ����q9o��� yF��3�¬��}�����2�,B#;�Di�QX=���`^zט�o�Zu}ZW,e#k!�Y ��ȳ첵�D���o�������if�(�yQ��O��<��Qj�$� [I�R���Mq�����(�������g��-�-I��1�3o\�a"q]��HlF�(�'�:�*+j���c���%�d�      �   *  x���Is�:F��+Xd+s5\�B�~�����Tod�b ~}���eыN��l���+1����m9!#Å 1�Ҝ{��k�6�P[_Ϊ��#VQ8�<��ѳ�������XOO�1�MB}7~�nN�~��~�	�|o��~<?�BQj��R�y%%� O(g�2	Q�X70A(�[�u@u�dFsв�k�~��hrڨIa�a<Ěġ4e�s�=@cW��z��[[��?^���|�;��ζ�z)��ߩ\?.x\��]*�8+�6�I_z��~א�#Y$�т�R����Y��0Q�OFoQ��P̸��a�_��7A3NR�Ʀ"�&�ʘ&�Xm4��C	�)�L��e1�(%|$Zx$R�cR�(o��U=�v�Y����(?_�G���I�4��I�b�>{�V<�{ǦO0��ؔ:ݫ����xrz��� � M>�T'�*D���\d:gҲ#H�P��ͅ%�9c���R9T��^������a~?yV%���+��jq;ڌe�I\.<=\��������� W/W4�Ѐ��B"�zR�gB£�`��Cu�̤����7��l�0�H�Y���8O�/��]�T�������+[�v�b�E����A�*������n�.__^���l��+z3����2|�����#LFp��b�}Mu�i�Q���0��H��Д��^!�!&�<2�<%GL:nR�^���)	�Х�i��yg�h_�g��y�֙���!�����O����9�o�P<0=���}�IQ�(�p��e����?�4x�E��S믬�l�8?h9      �     x�m�ݎ�8���S����s��毅���fn*�n A��5o�e��Vώ�*L}��GkU�ޣ�1p1� S�Z'U�j-U��!ؿ�xM�iH�.�����'���`���W_��=�/d_S���c㒁K���|�)�%�>>��4�p���V���a�fzĆ������%��>#��O���7�z��ns���9D;��U�`���p.
I��JIe8(�4[[U�^:/M��T-��孪}-�AS��������uii��[m�iZM2i��m?z�KbiU��;�W�y��˕�cI��<aCRU��&���|�,ͯ�p���������Z�1*�C��vm<]�D�^Bk{�:� ,9�T��'I�>uɃJ��nN��y�û<����@f���R�v!ƛ�&��t�:<�����K��B:+],�"DɁP�@"�����Q���]t�T��^���6<��c��x��#61���ёHL1�>!��׼/�X�H�Xm(8s�%rlK*��бocKa��n��i���x���jh~.[�ި����\ Jqxg��e��%u�BT�2"���&`l��z�ɺ����Š[kd�˫�r©ٺ�l3���[��9�5�o��x&�U~��-uZ�;�e+.�L������_+*ja���%�5��JB�ƥț�[RO����ٲ����N�m�t�}>����t�3q(��n@w
��<��x9���v'�GB9U�ߎ �ʨ����=v�a�aA��D0A���\��X,��V      �   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      �   ,  x�m�Mo�H��ʯ��b�!�[�b{�CE���2����$9���ˑcIn
�Dʘ�/_R�*\b��¤�Yi5�
��6���O�f��O�~���;�@���O���~<�yl�ǎi���|h�A��g��=�^�����A������	͍Sp����)J(>�m&C�)�wPtRR�T���|����v���������d��W���X��D��G��*���$tNƑN9��d4�YA_�gXxJ�7����~H�.-���|�z��l}n]����C���^hGMZr�y�,C�yi���2�h�ϨTJ͟�q:���~�򰋷�sy�R��$({Η�ǖ�^`�d��{i{��Hg��)�������Z��H�9i�i��iڟ�[�[�2��#;_���)�����$j�7D��$*��n5��U�HS�	+Z�BFd����
���c�lc��x��j��~#��,KB��@L�r��f
�k��A'���Ms�<K2:&��{��P�!
Č�?�2�ø�Iu���p%"�{�=�l'�-�y�V���kFB��H��PoX �PT�y��}k�b���'�����^a���fe�u)��C�V�D�S��'�22����[Z&4_��y��k����v	w.��u���N�{��g�^�J��`�5���L+���$��z~�wj`�E��mT�����A�2�霤��c2=Ǟ��)����CR���,}�u�h]F�*�,H������2��[`õ�f��g���Ɵ~�O��S���0�Nn�I����"oq�CX�fmfD	2Ҩ�H�I�B�}�FnsJ�B�H�)?�_��_�[L��5�n���h�̼��m��-��ꔕ�-W\UG�V�����E�����6{jx�Y�%�u%��Ssm���q�;�%�V���џ��)z]i�p�v�����BkDw�b��]-��B�R���͛�w#�
9��d�����E�G����D��/׶�qN���q�)�C{�o��sT����C6.¹AkHt�[��+XR�.�sہqڮm��=<<��^      �   �  x��V[n�X�vV��p���ܟ���w2�d2)j�e�����똵�:����;�b�c��G�5k�k� �K�M\�x���1� !|�]�̦v���>Z��Ĵ
bF7*,Ć[�<�[��(Q�i�| �CP�݅� KW��Nx}��P���4����1]�Wѓ������Hh��x�ʷ��<c��z�j�U�ܨ)e�>�Ah�h�p���p�slӬڷ@5*�w��o}��;^RO	��CV#Ԣ'��>A044��Z5�m�ר������B;sU�!2��XD�i2��Ȃ``�0!�v(��K8���7�A_I��T���=���3�<D�FgU�R�\��*~��0�U����rpoa��6��r`� ����1o�J -�J<���Xu�gO������t�m��U�sO���.����^�i�J���ԙ����q,�."CvO���n�`ʈ,�
�&��R6��>��U��z	������A�l:gb��m��~LU{��1�����?c�s�CĎ�R��ߑ����R;I�J�vb�ͫJX��fuB�� 3*|gʶ:��O�T�����.�`U3�� �Z������aL�Qo��DF�n��Z�gh�ə���G�SWKʒv{X��v_��e���g�I$�Qs�̋>���U-KPM*-;�>Ӆсښ)P9L������v��л+�j���t�o�BzCg��NΪ�V}��/b�f<u&�F�uˤKw�D{����?H�u�g�HFx�"9L7[���r~^O�*�fz����e�ڤ5Ҁ�z����1r�r��b����rqϖ�z�-oKg���o�k�ʵ��zD��aO˸*��EdY���ӈ���[�"�d8M>§$�)�#��1s��L���v�l+�|_272�D��\T+�o�j|k5��P��=̳D�ڼ[���|Ǯ�O'�*���?������v�      �   �  x���Kn#9���)t�T;7�{��t��Q�q�#+t�^�0�6`Q���$i�,�*̭F�*���T|�As(;��w�Q�@r�O�g�Yۜ`�8��()'H��*�cն{t!ivϧ/������]�]�����.�\����y�Y=��ѥ�sQ�ҡdf��ij��ϧ�
�R[)���5�)���9�Px#ʗ��Ĕ���j,�Ï��;���(�'�=)ǜ����g����n�-A��W/48��
���-(�������ׂ���r����;\+��O���0>������bD+�`?��y�k.�_+/Fh���Z�Y�i�� �Z��H�2xU �� o�=������.] E�ά3�}!	�"�=��� �a�b�DM�� Ac�3���o�zN��:�nY�l=��㧁����0$q���?<_ϟ|�SK�s܉Σe3���=����hn���/�����I�h%���J��b��72<[��Ώ��������bxV�M����1W3�����J�9RJ!�?P�2�]?�A�;���/�����	��B�d��>��)�-U�ۆ	Q���U{�&[�0�ǰg*�~�B8|T�\��/��G���JQꉬ[�}s��[�g.sj�W��;�7Gh��xzZgn�&��m_[��F��CE�H�Z�%Q�?g��m��Pr����mRZ�qq�g�8����e
b�:�|��~�����      �   �  x��W[�#9�v��/�ER"U������6rf���A5T'���`0)&�D�I�N��4h����9���wK:��l��ޤҞ\�X�i�#؛9O�i�N)�d�d�9J=�U^��#��軶w����h{����]�G�س�B�{!�Y��1������ja�*F>���,�(X�[S�z�u$r�Up3k�ȱ(��{����aU\oZ��~��״N�XjL9Φ*\��������ԕAG��IR��y�u+�ݎt�l�����gGE-=f��vk�fr�$m4t��������Z�kXc�э���[X�G����*�x1>��C�T,mR�r�Yj�G�K�>j��Ky��f!��G�T�I��Ё���W:QW鐴�KXWڪ����5'a��ɤ�*��-Q���I��źZ��{|��Vʙ�ZD��S���#ꣻ�PS��A�i�ow�B\l壸��㗫ᐌ?d-�b5���L[w�����aU������.⩈�����j�x�V�!l�i��Di�2{�82؂�)`Gn�H�$L�M�nݽ�[��(ZW�>4��g�PS8¼P��58�귰.����V�}�m�]�5�[ha�׍&^��j�-,Y��!��U
������K�	�D<0I�Vk3�(&�?�/�^�������w��foܬ��
4/�m������zotJU�rԗ�j2�Yp����EMPzjh������?0��VU����g	��2f�30}Q���՝oݡ�q�T�t� ����g��'�ڗ\}����J&o>J����	T0���/|���p�CePO=o���4�� 6�r��V�g�ځ����[8�p�R��'�jN�ޚO��]���%�%/���M��yw��A�u#���h3�Q�rhj�HQ�Η�5W���EF���q�N�=��p�����@e��b�,G� ��id����j�mH5������K�\E�x���,��ǀ��%[�p��a�a�O���"��^I�	y�+@�=�|#�|��s����9�Kd_�&�eY�����O`��:+�2pƎͨ9P6��k3�*�u(�� B0�یa9?��_~H�gⒷZ����kt�)R��U�D�G�;�q��;X_e돰�z����b��     